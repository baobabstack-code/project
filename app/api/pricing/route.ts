import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

async function getStaticFallback() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'pricing.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return { data: [] };
    }
}

export async function GET() {
    try {
        const pricingPlans = await prisma.pricing.findMany({
            orderBy: { id: 'asc' }
        });

        return NextResponse.json({
            data: pricingPlans.map(plan => ({
                id: plan.id,
                name: plan.name,
                price: plan.price,
                description: plan.description,
                features: plan.features,
                popular: plan.popular
            }))
        });
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}