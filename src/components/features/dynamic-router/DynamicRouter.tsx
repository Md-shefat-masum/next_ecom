'use client';

import { RouteData } from '@/types';
import CategoryProductsView from './views/CategoryProductsView';
import ProductDetailsView from './views/ProductDetailsView';
import BlogCategoryView from './views/BlogCategoryView';
import BlogPostView from './views/BlogPostView';
import PageView from './views/PageView';

interface DynamicRouterProps {
  data: RouteData;
}

export default function DynamicRouter({ data }: DynamicRouterProps) {
  const { data_type } = data;

  switch (data_type) {
    case 'product':
      return <ProductDetailsView data={data} />;
    
    case 'category_products':
    case 'subcategory_products':
    case 'childcategory_products':
      return <CategoryProductsView data={data} />;
    
    case 'brand_products':
      return <CategoryProductsView data={data} title="Brand Products" />;
    
    case 'collection_products':
      return <CategoryProductsView data={data} title="Collection Products" />;
    
    case 'blog_post':
      return <BlogPostView data={data} />;
    
    case 'blog_category':
    case 'blog_tag':
      return <BlogCategoryView data={data} />;
    
    case 'page':
      return <PageView data={data} />;
    
    default:
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Unknown Content Type</h1>
          <p className="text-gray-500">Unable to display this content.</p>
        </div>
      );
  }
}

