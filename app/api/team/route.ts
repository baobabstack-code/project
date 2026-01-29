import { NextResponse } from 'next/server';
import { fetchTeamMembers } from '../../../src/services/api/team';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getStaticFallback() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'team.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return { data: [] };
    }
}

export async function GET() {
    try {
        const result = await fetchTeamMembers();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static JSON data when database is unavailable
        const fallbackData = await getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}