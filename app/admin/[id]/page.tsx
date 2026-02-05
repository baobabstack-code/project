import { prisma } from '../../../src/lib/prisma';
import { assertAdmin } from '../../../src/lib/authz';
import SubmissionDetail from '../../../src/components/admin/SubmissionDetail';

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  await assertAdmin();
  const { id: idParam } = await params;
  const id = Number(idParam);
  const submission = await prisma.contactFormSubmission.findUnique({ where: { id } });
  if (!submission) {
    return null;
  }
  return <SubmissionDetail submission={submission} />;
}



