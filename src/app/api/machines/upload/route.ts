//api/machines/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir, access } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' 
      }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json({ 
        error: 'File size exceeds 5MB limit' 
      }, { status: 400 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename with extension
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file to uploads directory
    const fullPath = path.join(uploadDir, filename);
    await writeFile(fullPath, buffer);

    // Return the relative path for frontend usage
    return NextResponse.json({ 
      path: `/uploads/${filename}` 
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('imagePath');

    if (!imagePath) {
      return NextResponse.json({ error: 'Image path is required' }, { status: 400 });
    }

    // Normalize the path by removing leading slash and handling different path formats
    const normalizedPath = imagePath.replace(/^\/?(uploads\/)?/, 'uploads/');
    const fullPath = path.join(process.cwd(), 'public', normalizedPath);

    try {
      // Check if file exists before attempting deletion
      await access(fullPath);
      await unlink(fullPath);
      console.log(`Deleted image: ${fullPath}`);
      
      return NextResponse.json({ 
        message: 'Image deleted successfully' 
      }, { status: 200 });
    } catch (fileError) {
      // Different handling for file not found vs other errors
      const error = fileError as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        console.warn(`Image not found: ${fullPath}`);
        return NextResponse.json({ 
          message: 'Image not found' 
        }, { status: 404 });
      }

      console.error('Image deletion error:', error);
      return NextResponse.json({ 
        error: 'Failed to delete image',
        details: error.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected image deletion error:', error);
    return NextResponse.json({ 
      error: 'Unexpected error during image deletion',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}