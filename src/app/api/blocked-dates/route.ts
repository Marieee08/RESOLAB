import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blockedDates = await prisma.blockedDate.findMany();
      return res.status(200).json(blockedDates);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch blocked dates' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { date } = req.body;
      const blockedDate = await prisma.blockedDate.create({
        data: {
          date: new Date(date),
        },
      });
      return res.status(201).json(blockedDate);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to block date' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { date } = req.body;
      await prisma.blockedDate.deleteMany({
        where: {
          date: new Date(date),
        },
      });
      return res.status(200).json({ message: 'Date unblocked successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to unblock date' });
    }
  }
}