import prisma from '@/src/lib/prisma';

export interface CreateUserInput {
  email: string;
  name?: string;
}

export const userService = {
  /**
   * Creates a new user
   */
  async createUser(input: CreateUserInput) {
    return await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      }
    });
  },

  /**
   * Retrieves a user by email
   */
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  /**
   * Retrieves a user by ID
   */
  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            units: {
              select: {
                chapters: {
                  select: {
                    id: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  },

  /**
   * Updates a user's pro status
   */
  async updateUserProStatus(id: string, isPro: boolean) {
    return await prisma.user.update({
      where: { id },
      data: { isPro }
    });
  },

  /**
   * Deletes a user and all their related data
   */
  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }
};