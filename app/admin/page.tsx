import { prisma } from '../../src/lib/prisma';
import SubmissionsTable from '../../src/components/admin/SubmissionsTable';
import { assertAdmin } from '../../src/lib/authz';

export default async function AdminSubmissionsPage({ searchParams }: { searchParams: { q?: string; status?: string; page?: string; } }) {
  await assertAdmin();

  const page = Number(searchParams?.page || '1');
  const take = 20;
  const skip = (page - 1) * take;
  const q = (searchParams?.q || '').trim();
  const status = (searchParams?.status || '').trim();

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

  return <SubmissionsTable items={items} total={total} page={page} pageSize={take} />;
}



