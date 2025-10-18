"use client";
import React, { useState, useTransition } from 'react';
import Link from 'next/link';

type Submission = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  adminNote?: string | null;
  submittedAt: string | Date;
};

export default function SubmissionDetail({ submission }: { submission: Submission }) {
  const [status, setStatus] = useState<Submission['status']>(submission.status);
  const [note, setNote] = useState<string>(submission.adminNote || '');
  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNote: note })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to save');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card p-4 space-y-4">
      <h1 className="text-xl font-semibold text-white">Submission #{submission.id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 text-gray-300">
          <div><span className="text-gray-400">Name:</span> {submission.name}</div>
          <div><span className="text-gray-400">Email:</span> {submission.email}</div>
          {submission.phone && <div><span className="text-gray-400">Phone:</span> {submission.phone}</div>}
          {submission.company && <div><span className="text-gray-400">Company:</span> {submission.company}</div>}
          <div><span className="text-gray-400">Submitted:</span> {new Date(submission.submittedAt).toLocaleString()}</div>
          <div><span className="text-gray-400">Subject:</span> {submission.subject}</div>
        </div>
        <div>
          <div className="text-gray-200 whitespace-pre-wrap bg-white/5 rounded p-3 border border-white/10 min-h-[120px]">{submission.message}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as Submission['status'])} className="bg-white/5 border border-white/10 rounded p-2 text-gray-200 w-full">
            <option value="NEW">NEW</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Admin Note</label>
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={4} className="bg-white/5 border border-white/10 rounded p-2 text-gray-200 w-full" />
        </div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <div className="flex gap-2">
        <button onClick={onSave} disabled={saving} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <Link href="/admin" className="bg-white/5 border border-white/10 text-gray-300 hover:text-white px-4 py-2 rounded">
          Back to List
        </Link>
      </div>
    </div>
  );
}


