import { NextResponse } from 'next/server';
import { fetchContactInfo } from '../../../src/services/api/contact';

export const dynamic = 'force-dynamic';

function getStaticFallback() {
    return {
        data: {
            email: 'baobabstack@gmail.com',
            phone: '+263 77 123 4567',
            address: 'Harare, Zimbabwe'
        }
    };
}

export async function GET() {
    try {
        const result = await fetchContactInfo();
        return NextResponse.json(result);
    } catch (error) {
        console.error('API Error (using fallback):', error);
        // Fallback to static data when database is unavailable
        const fallbackData = getStaticFallback();
        return NextResponse.json(fallbackData);
    }
}