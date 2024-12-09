import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the service ID from the query
  const { id } = req.query;

  // Ensure id is a string
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid service ID' });
  }

  // Handle different HTTP methods
  switch (req.method) {
    case 'PUT':
      return await updateService(req, res, id);
    case 'DELETE':
      return await deleteService(req, res, id);
    default:
      // Explicitly set allowed methods
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).json({ 
        error: `Method ${req.method} Not Allowed`,
        allowedMethods: ['PUT', 'DELETE']
      });
  }
}

// UPDATE a service
async function updateService(req: NextApiRequest, res: NextApiResponse, id: string) {
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

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        Service,
        machineId: machineId || null
      }
    });

    return res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    
    // Check for "Record not found" error
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        error: 'Service not found', 
        details: error.message 
      });
    }

    return res.status(500).json({ 
      error: 'Unable to update service', 
      details: error.message 
    });
  }
}

// DELETE a service
async function deleteService(req: NextApiRequest, res: NextApiResponse, id: string) {
  try {
    await prisma.service.delete({
      where: { id }
    });

    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    
    // Check for "Record not found" error
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        error: 'Service not found', 
        details: error.message 
      });
    }

    return res.status(500).json({ 
      error: 'Unable to delete service', 
      details: error.message 
    });
  }
}