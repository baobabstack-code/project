import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

async function getStaticFallback() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'stats.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return { data: [] };
    }
}

export async function GET() {
    try {
        const stats = await prisma.stats.findMany({
            orderBy: { id: 'asc' }
        });

        return NextResponse.json({
            data: stats.map(stat => ({
                id: stat.id,
                icon: stat.icon || 'Award',
                value: stat.value,
                label: stat.label
            }))
        });
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}