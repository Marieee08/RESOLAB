import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV !== 'production') global.prisma = prisma