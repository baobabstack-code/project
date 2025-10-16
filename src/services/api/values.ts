import { prisma } from '../../lib/prisma';

export interface CompanyValue {
    id: number;
    title: string;
    description: string;
    icon?: string;
}

export const fetchCompanyValues = async (): Promise<{ data: CompanyValue[] }> => {
    try {
        const values = await prisma.values.findMany({
            orderBy: { id: 'asc' },
        });

        return {
            data: values.map(value => ({
                id: value.id,
                title: value.title,
                description: value.description,
                icon: value.icon || undefined,
            }))
        };
    } catch (error) {
        console.error('Error fetching company values:', error);
        throw new Error('Failed to fetch company values');
    }
};

