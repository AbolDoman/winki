import { Metadata } from 'next';
// components
import GatewayPage from '@/features/gateway/components/GatewayPage';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

// types
interface PaymentPageProps {
  params: Promise<{ token: string }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { token } = await params;

  return <GatewayPage transactionId={token} />;
}
