import ReviewsPageClient from '@/features/products/components/product-detail/components/mobile/components/reviews/ReviewsPageClient';

interface ReviewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: ReviewsPageProps) {
  const { slug } = await params;
  return <ReviewsPageClient slug={slug ?? ''} />;
}
