import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
    console.log('1. Webhook endpoint hit');

    try {
        console.log('2. Starting webhook processing');
        
        // Check environment variables
        console.log('3. Environment variables:', {
            hasWebhookSecret: !!process.env.WEBHOOK_SECRET,
            hasDatabase: !!process.env.DATABASE_URL
        });

        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
        if (!WEBHOOK_SECRET) {
            console.error('4. Missing webhook secret');
            throw new Error('Missing WEBHOOK_SECRET');
        }

        // Get and log headers
        const headerPayload = await headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        console.log('5. Headers received:', {
            has_svix_id: !!svix_id,
            has_timestamp: !!svix_timestamp,
            has_signature: !!svix_signature
        });

        if (!svix_id || !svix_timestamp || !svix_signature) {
            console.error('6. Missing required headers');
            return new Response('Missing svix headers', { status: 400 });
        }

        // Log request body
        const payload = await req.json();
        console.log('7. Request payload:', payload);
        const body = JSON.stringify(payload);

        // Verify webhook
        console.log('8. Attempting webhook verification');
        const wh = new Webhook(WEBHOOK_SECRET);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
            console.log('9. Webhook verified successfully');
        } catch (error: any) {
            console.error('10. Webhook verification failed:', error);
            return new Response(`Webhook verification failed: ${error.message}`, { status: 400 });
        }

        // Process event
        const eventType = evt.type;
        console.log('11. Processing event type:', eventType);

        if (eventType === 'user.created') {
            try {
                console.log('Starting user creation process');
                console.log('Full user data:', evt.data);
        
                // Update Clerk metadata first
                await clerkClient.users.updateUser(evt.data.id, {
                    publicMetadata: {
                        role: "USER"
                    }
                });
        
                // Get primary email address
                const primaryEmail = evt.data.email_addresses?.find(email => email.id === evt.data.primary_email_address_id)?.email_address;
                
                if (!primaryEmail) {
                    throw new Error('No primary email address found for user');
                }
        
                // Prepare user data
                const userData = {
                    clerkId: evt.data.id,
                    Name: evt.data.first_name 
                        ? `${evt.data.first_name} ${evt.data.last_name || ''}`
                        : 'New User',
                    email: primaryEmail,
                    Role: "USER",
                };
        
                console.log('Prepared user data:', userData);
        
                // Create in database
                const createdUser = await prisma.accInfo.create({
                    data: userData
                });
        
                console.log('User created successfully:', createdUser);
                return new Response('User created successfully', { status: 201 });
            } catch (error: any) {
                console.error('User creation error:', {
                    message: error.message,
                    code: error?.code,
                    meta: error?.meta,
                    step: error.step || 'unknown'
                });
                return new Response(`Failed to create user: ${error.message}`, { status: 500 });
            }
        }

        if (eventType === 'user.deleted') {
            try {
                console.log('Starting delete process for user:', evt.data.id);
                
                // First check if user exists
                const existingUser = await prisma.accInfo.findUnique({
                    where: { clerkId: evt.data.id },
                    include: {
                        ClientInfo: true,
                        BusinessInfo: true,
                        UtilReqs: true,
                        EVCReservations: true
                    }
                });
        
                if (!existingUser) {
                    console.log('User not found for deletion:', evt.data.id);
                    return new Response('User not found', { status: 404 });
                }
        
                // Delete related records first using transaction
                await prisma.$transaction(async (tx) => {
                    // Delete related UtilReqs
                    if (existingUser.UtilReqs.length > 0) {
                        await tx.utilReq.deleteMany({
                            where: { accInfoId: existingUser.id }
                        });
                    }
        
                    // Delete related EVCReservations
                    if (existingUser.EVCReservations.length > 0) {
                        await tx.eVCReservation.deleteMany({
                            where: { accInfoId: existingUser.id }
                        });
                    }
        
                    // Delete ClientInfo if exists
                    if (existingUser.ClientInfo) {
                        await tx.clientInfo.delete({
                            where: { id: existingUser.ClientInfo.id }
                        });
                    }
        
                    // Delete BusinessInfo if exists
                    if (existingUser.BusinessInfo) {
                        await tx.businessInfo.delete({
                            where: { id: existingUser.BusinessInfo.id }
                        });
                    }
        
                    // Finally delete the user
                    await tx.accInfo.delete({
                        where: { id: existingUser.id }
                    });
                });
        
                console.log('User and all related records deleted successfully:', {
                    userId: evt.data.id,
                    deletedAt: new Date().toISOString()
                });
        
                return new Response('User and all related records deleted successfully', { status: 200 });
            } catch (error: any) {
                console.error('Error during deletion:', {
                    error: error.message,
                    code: error?.code,
                    meta: error?.meta,
                    stack: error.stack
                });
        
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // Handle specific Prisma errors
                    switch (error.code) {
                        case 'P2025':
                            return new Response('Record not found', { status: 404 });
                        case 'P2003':
                            return new Response('Foreign key constraint failed', { status: 400 });
                        default:
                            return new Response(`Database error: ${error.code}`, { status: 500 });
                    }
                }
        
                return new Response(`Failed to delete user: ${error.message}`, { status: 500 });
            }
        }

        console.log('17. Webhook processed successfully');
        return new Response('Webhook processed successfully', { status: 200 });

    } catch (error: any) {
        console.error('18. Main error handler:', error);
        return new Response(`Webhook processing failed: ${error.message}`, { status: 500 });
    }
}