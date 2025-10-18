"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Download, Filter } from 'lucide-react';

type Item = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  submittedAt: string | Date;
};

export default function SubmissionsTable({ items, total, page, pageSize }: { items: Item[]; total: number; page: number; pageSize: number; }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (status) params.set('status', status);
    if (page > 1) params.set('page', page.toString());
    router.push(`/admin?${params.toString()}`);
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'export' })
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'submissions.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl text-white font-semibold">Contact Submissions</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{total} total</span>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, subject..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded text-gray-200 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded text-gray-300 hover:text-white"
          >
            <Filter size={16} />
            Filters
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="flex gap-4 items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded px-3 py-2 text-gray-200"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-300 border-b border-white/10">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Subject</th>
              <th className="py-2 pr-4">Submitted</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-2 pr-4 text-white">{item.name}</td>
                <td className="py-2 pr-4 text-gray-300">{item.email}</td>
                <td className="py-2 pr-4 text-gray-300">{item.subject}</td>
                <td className="py-2 pr-4 text-gray-300">{new Date(item.submittedAt).toLocaleString()}</td>
                <td className="py-2 pr-4">
                  <span className="text-xs rounded px-2 py-1 bg-white/10 text-gray-200">{item.status}</span>
                </td>
                <td className="py-2 pr-4">
                  <Link href={`/admin/${item.id}`} className="text-purple-300 hover:text-purple-200 underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-gray-400">Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 && (
            <Link
              href={`/admin?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (page - 1).toString() }).toString()}`}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-300 hover:text-white"
            >
              Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/admin?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: (page + 1).toString() }).toString()}`}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded text-gray-300 hover:text-white"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


