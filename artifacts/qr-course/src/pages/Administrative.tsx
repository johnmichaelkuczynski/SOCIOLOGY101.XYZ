import React, { useEffect, useState } from "react";
import { Redirect } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ADMIN_EMAIL = "johnmichaelkuczynski@gmail.com";
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

interface VisitEntry {
  id: number;
  email: string | null;
  visitedAt: string;
}

interface SeriesPoint {
  label: string;
  count: number;
}

interface AdminData {
  stats: {
    allTime: number;
    last24Hours: number;
    lastWeek: number;
    lastMonth: number;
    lastYear: number;
  };
  series: {
    last24Hours: SeriesPoint[];
    lastWeek?: SeriesPoint[];
    lastMonth: SeriesPoint[];
    lastYear: SeriesPoint[];
    allTime: SeriesPoint[];
  };
  visits: VisitEntry[];
}

type Period = "last24Hours" | "lastWeek" | "lastMonth" | "lastYear" | "allTime";

const PERIODS: { key: Period; label: string; stat: keyof AdminData["stats"] }[] = [
  { key: "last24Hours", label: "Last 24 Hours", stat: "last24Hours" },
  { key: "lastWeek", label: "Last 7 Days", stat: "lastWeek" },
  { key: "lastMonth", label: "Last 30 Days", stat: "lastMonth" },
  { key: "lastYear", label: "Last Year", stat: "lastYear" },
  { key: "allTime", label: "All Time", stat: "allTime" },
];

function StatCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-9 w-16" />
        ) : (
          <div className="text-4xl font-serif font-bold text-primary">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Administrative() {
  const { loading: authLoading, authenticated, user } = useAuth();
  const [data, setData] = useState<AdminData | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [activePeriod, setActivePeriod] = useState<Period>("last24Hours");

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    if (!authLoading && authenticated && isAdmin) {
      fetch(`${basePath}/api/admin/visits`, { credentials: "include" })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((d) => setData(d))
        .catch(() => setFetchError(true));
    }
  }, [authLoading, authenticated, isAdmin]);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!authenticated) return <Redirect to="/" />;
  if (!isAdmin) return <Redirect to="/dashboard" />;

  const loading = !data && !fetchError;
  const chartData = data?.series[activePeriod] ?? [];
  const activePeriodMeta = PERIODS.find((p) => p.key === activePeriod)!;

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto w-full flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-1">Administrative</h1>
          <p className="text-muted-foreground text-sm">Google login analytics and visitor history</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="Last 24 Hours" value={data?.stats.last24Hours ?? 0} loading={loading} />
          <StatCard label="Last 7 Days" value={data?.stats.lastWeek ?? 0} loading={loading} />
          <StatCard label="Last 30 Days" value={data?.stats.lastMonth ?? 0} loading={loading} />
          <StatCard label="Last Year" value={data?.stats.lastYear ?? 0} loading={loading} />
          <StatCard label="All Time" value={data?.stats.allTime ?? 0} loading={loading} />
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <CardTitle className="text-base font-semibold">Logins — {activePeriodMeta.label}</CardTitle>
              <div className="flex gap-1 flex-wrap">
                {PERIODS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setActivePeriod(p.key)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      activePeriod === p.key
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-56 w-full" />
            ) : fetchError ? (
              <p className="text-sm text-destructive">Failed to load data.</p>
            ) : chartData.length === 0 ? (
              <p className="text-sm text-muted-foreground">No logins recorded yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                    className="text-muted-foreground"
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 6 }}
                    formatter={(v: number) => [v, "Logins"]}
                  />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]} className="fill-primary" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Login history table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Login History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            ) : fetchError ? (
              <p className="p-6 text-sm text-destructive">Failed to load login history.</p>
            ) : !data?.visits.length ? (
              <p className="p-6 text-sm text-muted-foreground">No logins recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/40 text-muted-foreground text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 text-left font-medium">Gmail</th>
                      <th className="px-6 py-3 text-left font-medium">Date &amp; Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.visits.map((v) => (
                      <tr key={v.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                        <td className="px-6 py-3 font-mono">{v.email ?? "—"}</td>
                        <td className="px-6 py-3 text-muted-foreground">
                          {new Date(v.visitedAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
