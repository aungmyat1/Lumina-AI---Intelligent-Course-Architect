import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents Prisma from creating multiple instances during hot reloads
  // in development environments
  var prisma: PrismaClient | undefined
}

const client = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = client
}

export default client