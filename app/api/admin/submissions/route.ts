import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import { assertAdmin } from '../../../../src/lib/authz';

export async function GET(request: NextRequest) {
  try {
    await assertAdmin();
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const take = Number(searchParams.get('limit') || '20');
    const skip = (page - 1) * take;
    const q = (searchParams.get('query') || '').trim();
    const status = (searchParams.get('status') || '').trim();

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { subject: { contains: q, mode: 'insensitive' } },
        { message: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status as any;

    const [items, total] = await Promise.all([
      prisma.contactFormSubmission.findMany({ where, orderBy: { submittedAt: 'desc' }, skip, take }),
      prisma.contactFormSubmission.count({ where }),
    ]);

    return NextResponse.json({ data: items, pagination: { total, page, pageSize: take } });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    await assertAdmin();
    const body = await request.json().catch(() => ({}));
    if (body?.action === 'export') {
      // Simple CSV export
      const items = await prisma.contactFormSubmission.findMany({ orderBy: { submittedAt: 'desc' } });
      const header = ['id','name','email','phone','company','subject','message','status','submittedAt'];
      const rows = items.map(i => [i.id,i.name,i.email,i.phone||'',i.company||'',i.subject,JSON.stringify(i.message),i.status,i.submittedAt.toISOString()]);
      const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
      return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="submissions.csv"' } });
    }
    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: 'Failed to process request' }, { status });
  }
}



