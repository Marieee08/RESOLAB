import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Determine the HTTP method and call the appropriate function
  switch (req.method) {
    case 'GET':
      return await getServices(req, res);
    case 'POST':
      return await createService(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET all services or services for a specific machine
async function getServices(req: NextApiRequest, res: NextApiResponse) {
  const { machineId } = req.query;

  try {
    const services = machineId
      ? await prisma.service.findMany({
          where: { machineId: machineId as string }
        })
      : await prisma.service.findMany();

    return res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ 
      error: 'Unable to fetch services', 
      details: error.message 
    });
  }
}

// CREATE a new service
async function createService(req: NextApiRequest, res: NextApiResponse) {
  const { Service, machineId } = req.body;

  try {
    // Validate input
    if (!Service) {
      return res.status(400).json({ error: 'Service name is required' });
    }

    // Optional: Check if machine exists if machineId is provided
    if (machineId) {
      const machine = await prisma.machine.findUnique({
        where: { id: machineId }
      });

      if (!machine) {
        return res.status(404).json({ error: 'Machine not found' });
      }
    }

    const newService = await prisma.service.create({
      data: {
        Service,
        machineId: machineId || undefined
      }
    });

    return res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ 
      error: 'Unable to create service', 
      details: error.message 
    });
  }
}