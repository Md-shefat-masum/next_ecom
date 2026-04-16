'use client';

import Link from 'next/link';
import './ProductTitle.css';

interface ProductTitleProps {
  name: string;
  slug: string;
  className?: string;
  maxLines?: number;
}

export default function ProductTitle({ 
  name, 
  slug, 
  className = '',
  maxLines = 2 
}: ProductTitleProps) {
  const lineClampClass = maxLines === 2 ? 'line-clamp-2' : maxLines === 1 ? 'line-clamp-1' : '';
  
  return (
    <Link 
      href={`/products/${slug}`} 
      className={`product-title ${lineClampClass} ${className}`}
    >
      {name}
    </Link>
  );
}

