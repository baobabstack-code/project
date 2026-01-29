import { prisma } from '../../lib/prisma';

export interface Newsletter {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
}

export const fetchNewsletters = async (params?: Record<string, any>): Promise<{ data: Newsletter[] }> => {
  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { publishedAt: 'desc' },
      take: params?.limit || 10,
      skip: params?.offset || 0,
    });

    return {
      data: newsletters.map(newsletter => ({
        ...newsletter,
        publishedAt: newsletter.publishedAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    throw new Error('Failed to fetch newsletters');
  }
};

export const fetchNewsletter = async (id: number): Promise<{ data: Newsletter }> => {
  try {
    const newsletter = await prisma.newsletter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      throw new Error('Newsletter not found');
    }

    return {
      data: {
        ...newsletter,
        publishedAt: newsletter.publishedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    throw new Error('Failed to fetch newsletter');
  }
};

export const createNewsletter = async (newsletterData: Omit<Newsletter, 'id' | 'publishedAt'>): Promise<Newsletter> => {
  try {
    const newsletter = await prisma.newsletter.create({
      data: {
        ...newsletterData,
        publishedAt: new Date(),
      },
    });

    return {
      ...newsletter,
      publishedAt: newsletter.publishedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error creating newsletter:', error);
    throw new Error('Failed to create newsletter');
  }
};