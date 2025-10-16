import { NextResponse } from 'next/server';
import { fetchCompanyValues } from '../../../src/services/api/values';

export async function GET() {
    try {
        const result = await fetchCompanyValues();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch company values' },
            { status: 500 }
        );
    }
}

