import { prisma } from '../../lib/prisma';

export interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export const fetchSubscribers = async (params?: Record<string, any>): Promise<{ data: Subscriber[] }> => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
      take: params?.limit || 10,
      skip: params?.offset || 0,
    });

    return {
      data: subscribers.map(subscriber => ({
        ...subscriber,
        subscribedAt: subscriber.subscribedAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    throw new Error('Failed to fetch subscribers');
  }
};

export const subscribe = async (email: string): Promise<Subscriber> => {
  try {
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return {
      ...subscriber,
      subscribedAt: subscriber.subscribedAt.toISOString(),
    };
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Failed to subscribe');
  }
};