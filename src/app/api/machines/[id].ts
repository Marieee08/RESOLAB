import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const machine = await prisma.machine.findUnique({
        where: { id: String(id) },
      });
      if (machine) {
        res.status(200).json(machine);
      } else {
        res.status(404).json({ error: 'Machine not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving machine' });
    }
  } else if (req.method === 'PUT') {
    const { Machine, Image, Desc, Link } = req.body;

    try {
      const updatedMachine = await prisma.machine.update({
        where: { id: String(id) },
        data: {
          Machine,
          Image,
          Desc,
          Link,
        },
      });
      res.status(200).json(updatedMachine);
    } catch (error) {
      res.status(500).json({ error: 'Error updating machine' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.machine.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting machine' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
