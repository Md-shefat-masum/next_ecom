'use client';
import { useEffect, useState } from 'react';
import FeaturedCategoryProductsClient from './FeaturedCategoryProductsClient';
import { fetchFeaturedCategorySections } from '@/lib/api/server/featuredCategoryProducts';
import type { FeaturedCategorySection } from '@/types/featuredCategoryHome';

export default function FeaturedCategoryProducts() {
  const [sections, setSections] = useState<FeaturedCategorySection[] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchFeaturedCategorySections().then((data) => {
      if (mounted) {
        setSections(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!sections || sections.length === 0) {
    return null;
  }

  return <FeaturedCategoryProductsClient sections={sections} />;
}
