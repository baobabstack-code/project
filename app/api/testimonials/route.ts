import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback(page: number, limit: number, search: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'testimonials.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    
    let testimonials = jsonData.data || [];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      testimonials = testimonials.filter((t: { content?: string; author?: string; company?: string }) =>
        (t.content && t.content.toLowerCase().includes(searchLower)) ||
        (t.author && t.author.toLowerCase().includes(searchLower)) ||
        (t.company && t.company.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const skip = (page - 1) * limit;
    return testimonials.slice(skip, skip + limit);
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { content: { contains: search, mode: 'insensitive' as const } },
        { author: { contains: search, mode: 'insensitive' as const } },
        { company: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const testimonials = await prisma.testimonial.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials (using fallback):', error);
    // Fallback to static JSON data when database is unavailable
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const fallbackData = await getStaticFallback(page, limit, search);
    return NextResponse.json(fallbackData);
  }
}