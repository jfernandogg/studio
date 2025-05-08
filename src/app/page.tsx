
import { PolicyAcceptanceClientPage } from '@/components/client-pages/policy-acceptance-client-page';
import { AccessController } from '@/components/auth/access-controller';

export default function HomePage() {
  return (
    <AccessController>
      <PolicyAcceptanceClientPage />
    </AccessController>
  );
}
