import IconProvider from '@/providers/Iconprovider';
import Link from 'next/link';

interface BackLinkProps {
  href?: string;
  label: string;
}

const BackLink = ({ href = '/profile/', label }: BackLinkProps) => {
  return (
    <Link href={href} className="flex lg:hidden items-center gap-3">
      <IconProvider icon="ArrowRight" color="var(--color-neutral-400)" size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default BackLink;
