import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'techstack.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return { data: [] };
    }
}

export async function GET() {
    try {
        const techStack = await prisma.techStack.findMany({
            orderBy: { id: 'asc' }
        });

        return NextResponse.json({
            data: techStack.map(item => ({
                id: item.id,
                name: item.name,
                category: item.category,
                icon: item.icon,
                description: item.description
            }))
        });
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}