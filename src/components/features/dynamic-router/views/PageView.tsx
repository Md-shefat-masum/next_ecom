'use client';

import { RouteData, PageContent } from '@/types';

interface PageViewProps {
  data: RouteData;
}

export default function PageView({ data }: PageViewProps) {
  const page = data.data as PageContent;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{page.title}</h1>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}

