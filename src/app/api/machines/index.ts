import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { Machine, Image, Desc, Link } = req.body; // Make sure these names match your form data

    try {
      const newMachine = await prisma.machine.create({
        data: {
          Machine,
          Image,
          Desc,
          Link,
        },
      });
      res.status(201).json(newMachine);
    } 
    catch (error) {
      console.error('Error creating machine:', error); // Add logging for better debugging
      res.status(500).json({ error: 'Error creating machine' });
    }
  } 
  
  else if (req.method === 'POST') {
    const { Machine, Image, Desc, Link } = req.body;

    try {
      const newMachine = await prisma.machine.create({
        data: {
          Machine,
          Image,
          Desc,
          Link,
        },
      });
      res.status(201).json(newMachine);
      } 
    catch (error) {
      res.status(500).json({ error: 'Error creating machine' });
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
