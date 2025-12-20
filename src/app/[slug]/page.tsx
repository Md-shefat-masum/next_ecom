import { notFound } from 'next/navigation';
import DynamicRouter from '@/components/features/dynamic-router/DynamicRouter';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  let data;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/route/resolve/${slug}`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) {
      notFound();
    }
    
    data = await response.json();
    
    if (!data.success || !data.data) {
      notFound();
    }
  } catch {
    notFound();
  }
  
  return <DynamicRouter data={data.data} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/route/resolve/${slug}`,
      { next: { revalidate: 60 } }
    );
    
    if (!response.ok) return { title: 'Not Found' };
    
    const data = await response.json();
    
    return {
      title: data.data?.metadata?.title || slug,
      description: data.data?.metadata?.description,
    };
  } catch {
    return { title: 'Not Found' };
  }
}

