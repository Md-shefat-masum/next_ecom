'use client';

import { RouteData, BlogPost } from '@/types';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCategoryViewProps {
  data: RouteData;
}

export default function BlogCategoryView({ data }: BlogCategoryViewProps) {
  const categoryData = data.data as any;
  const posts = categoryData?.posts || [];
  const categoryName = categoryData?.name || 'Blog';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        {categoryData?.description && (
          <p className="text-gray-600">{categoryData.description}</p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-video bg-gray-100">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  {post.published_at && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  )}
                  {post.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author.name}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-amber-600 transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                )}
                <Link href={`/blog/${post.slug}`} className="text-amber-600 hover:underline flex items-center gap-1">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}

