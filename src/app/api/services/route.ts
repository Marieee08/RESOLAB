// api/services/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (error) {
    console.error('Services GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.Service) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 })
    }

    const newService = await prisma.service.create({
      data: {
        Service: body.Service,
        machineId: body.machineId || null, // Use machineId
        Costs: body.Costs || null
      }
    })

    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error('Services POST error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}