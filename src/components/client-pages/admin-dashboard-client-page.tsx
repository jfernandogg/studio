"use client";

import { AdminDataView } from "@/components/admin/data-view";

export function AdminDashboardClientPage() {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      <AdminDataView />
    </div>
  );
}
