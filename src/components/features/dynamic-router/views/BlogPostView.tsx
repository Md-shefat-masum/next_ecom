'use client';

import { RouteData, BlogPost } from '@/types';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPostViewProps {
  data: RouteData;
}

export default function BlogPostView({ data }: BlogPostViewProps) {
  const post = data.data as BlogPost;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center gap-2 text-amber-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <article className="max-w-3xl mx-auto">
        {post.image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
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
          {post.category && (
            <Link href={`/blog/category/${post.category.slug}`} className="flex items-center gap-1 hover:text-amber-600">
              <Tag className="w-4 h-4" />
              {post.category.name}
            </Link>
          )}
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-semibold mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link 
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-amber-100 hover:text-amber-600"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

