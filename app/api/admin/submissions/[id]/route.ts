import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../src/lib/prisma';
import { assertAdmin } from '../../../../../src/lib/authz';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await assertAdmin();
    const { id: idParam } = await params;
    const id = Number(idParam);
    const item = await prisma.contactFormSubmission.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: item });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await assertAdmin();
    const { id: idParam } = await params;
    const id = Number(idParam);
    const body = await request.json();
    const data: any = {};
    if (body.status) data.status = body.status;
    if (typeof body.adminNote === 'string') data.adminNote = body.adminNote;
    const item = await prisma.contactFormSubmission.update({ where: { id }, data });
    return NextResponse.json({ data: item });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: 'Failed to update submission' }, { status });
  }
}



