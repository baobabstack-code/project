import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'features.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return { data: [] };
    }
}

export async function GET() {
    try {
        const features = await prisma.feature.findMany({
            orderBy: { id: 'asc' }
        });

        return NextResponse.json({
            data: features.map(feature => ({
                id: feature.id,
                title: feature.title,
                description: feature.description,
                icon: feature.icon
            }))
        });
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}