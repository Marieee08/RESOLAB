// api/tools/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all tools from the database
    const tools = await prisma.tool.findMany();

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch tools', 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const data = await req.json();
    console.log('Received data:', data);

    // Destructure with default values and type conversion
    const { Tool = '', Quantity = 0 } = data;

    // Validate input
    if (!Tool.trim()) {
      return NextResponse.json(
        { error: 'Tool name is required' }, 
        { status: 400 }
      );
    }

    // Ensure Quantity is a number
    const quantityNum = Number(Quantity);
    if (isNaN(quantityNum)) {
      return NextResponse.json(
        { error: 'Quantity must be a number' }, 
        { status: 400 }
      );
    }

    // Attempt to create the tool
    const tool = await prisma.tool.create({
      data: {
        Tool: Tool.trim(),
        Quantity: quantityNum
      }
    });

    console.log('Created tool:', tool);

    return NextResponse.json(tool, { status: 201 });
  } catch (error) {
    // Log the full error for debugging
    console.error('Full error creating tool:', error);

    // More detailed error response
    return NextResponse.json(
      { 
        error: 'Failed to create tool', 
        details: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}