"use client";

import { useEffect, useState } from "react";

type Log = {
  id: string;
  action: string;
  resource: string | null;
  details: string | null;
  createdAt: string;
};

export default function OrbitActivityPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/orbit/activity");
      const json = await res.json();
      if (res.ok) setLogs(json.logs);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="mt-1 text-sm text-[var(--hb-muted)]">
          Security and content actions for Orbit Super Admin.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-[var(--hb-muted)]">
            <tr>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">Details</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-white/10">
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3 text-[var(--hb-muted)]">
                  {log.resource || "—"}
                </td>
                <td className="px-4 py-3 text-[var(--hb-muted)]">
                  {log.details || "—"}
                </td>
                <td className="px-4 py-3 text-[var(--hb-muted)]">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
