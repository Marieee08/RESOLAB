import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const machines = await prisma.machine.findMany();
      res.status(200).json(machines);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching machines', error });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, image, description, videoUrl } = req.body;
      const machine = await prisma.machine.create({
        data: { name, image, description, videoUrl },
      });
      res.status(201).json(machine);
    } catch (error) {
      res.status(500).json({ message: 'Error creating machine', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}