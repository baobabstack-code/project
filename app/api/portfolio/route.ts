import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioItems } from '../../../src/services/api/portfolio';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback(limit: number, offset: number) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'portfolio.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        const allItems = jsonData.data || [];
        
        return {
            data: allItems.slice(offset, offset + limit)
        };
    } catch {
        return { data: [] };
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const offset = searchParams.get('offset');

        const params = {
            ...(limit && { limit: parseInt(limit) }),
            ...(offset && { offset: parseInt(offset) }),
        };

        const result = await fetchPortfolioItems(params);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');
        
        const fallbackData = await getStaticFallback(limit, offset);
        return NextResponse.json(fallbackData);
    }
}