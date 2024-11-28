import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const filename = Date.now() + '-' + file.name.replace(/\s/g, '-');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure the upload directory exists
    await import('fs').then(fs => {
      if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
      }
    });

    // Write file to uploads directory
    const fullPath = path.join(uploadDir, filename);
    await writeFile(fullPath, new Uint8Array(buffer)); // Convert Buffer to Uint8Array

    // Return the path that can be used in the frontend
    return NextResponse.json({ 
      path: `/uploads/${filename}` 
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file' 
    }, { status: 500 });
  }
}