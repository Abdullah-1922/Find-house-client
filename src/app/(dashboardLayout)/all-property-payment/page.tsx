'use client';

import { useUser } from '@/hooks/user.hook';
import AdminPropertyPayment from '../_components/modules/allPropertyPayment/AdminAllPropertyPayment';
import Spinner from '@/components/ui/spinner';
import AgentPropertyPayment from '../_components/modules/allPropertyPayment/AgentAllPropertyPayment';
import Container from '@/components/ui/container';

const Page = () => {
  const { user } = useUser();
  if (!user) return <Spinner />;

  return (
    <Container>
      <div className="p-2 md:p-4 border rounded-md">
        {user.role === 'admin' ? (
          <AdminPropertyPayment />
        ) : (
          <AgentPropertyPayment />
        )}
      </div>
    </Container>
  );
};

export default Page;
