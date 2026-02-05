import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogPost } from '../../../../src/services/api/blog';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = parseInt(idParam);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid blog ID' },
                { status: 400 }
            );
        }

        const result = await fetchBlogPost(id);
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog post' },
            { status: 500 }
        );
    }
}