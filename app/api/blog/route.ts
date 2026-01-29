import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogPosts } from '../../../src/services/api/blog';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback(limit: number, offset: number) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'blog.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        const allPosts = jsonData.data || [];
        
        const paginatedPosts = allPosts.slice(offset, offset + limit);
        
        return {
            data: paginatedPosts,
            meta: {
                pagination: {
                    total: allPosts.length,
                    page: Math.floor(offset / limit) + 1,
                    pageSize: limit,
                    hasMore: offset + limit < allPosts.length,
                },
            },
        };
    } catch {
        return { data: [], meta: { pagination: { total: 0, page: 1, pageSize: limit } } };
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    try {
        const params = {
            limit,
            offset,
        };

        const result = await fetchBlogPosts(params);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback(limit, offset);
        return NextResponse.json(fallbackData);
    }
}