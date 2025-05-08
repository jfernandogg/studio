
import { AdminDashboardClientPage } from '@/components/client-pages/admin-dashboard-client-page';
import { AccessController } from '@/components/auth/access-controller';

export default function AdminPage() {
  return (
    <AccessController>
      <AdminDashboardClientPage />
    </AccessController>
  );
}
