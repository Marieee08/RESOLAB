import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tools - Get all tools
export async function GET() {
  try {
    const tools = await prisma.tool.findMany();
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}

// POST /api/tools - Create a new tool
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { Tool, Quantity } = data;

    const tool = await prisma.tool.create({
      data: {
        Tool,
        Quantity: parseInt(Quantity),
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 });
  }
}