// api/services/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { id } = params

    if (!body.Service) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 })
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        Service: body.Service,
        machineId: body.machineId || null, // Use machineId
        Costs: body.Costs || null
      }
    })

    return NextResponse.json(updatedService)
  } catch (error) {
    console.error('Service PUT error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.service.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Service DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}