'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();

  // Placeholder post
  const post = {
    id: 1,
    title: 'Top 10 Tech Gadgets of 2024',
    slug: params.slug,
    content: `<p>Technology continues to evolve at a rapid pace, and 2024 has brought us some incredible innovations. In this article, we'll explore the top 10 tech gadgets that are making waves this year.</p>
    <h2>1. Smart Home Hub</h2>
    <p>The latest smart home hubs offer unprecedented control over your connected devices, with improved AI capabilities and seamless integration.</p>
    <h2>2. Wireless Earbuds</h2>
    <p>Audio quality has reached new heights with the latest generation of wireless earbuds, featuring spatial audio and active noise cancellation.</p>
    <p>Stay tuned for more updates on the latest tech trends!</p>`,
    image: null,
    published_at: '2024-01-15',
    author: { name: 'John Doe', image: null },
    category: { name: 'Technology', slug: 'technology' },
    tags: [{ id: 1, name: 'Tech', slug: 'tech' }, { id: 2, name: 'Gadgets', slug: 'gadgets' }],
  };

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

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author.name}
          </span>
          <Link href={`/blog/category/${post.category.slug}`} className="flex items-center gap-2 hover:text-amber-600">
            <Tag className="w-4 h-4" />
            {post.category.name}
          </Link>
        </div>

        <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b">
          <span className="font-medium">Tags:</span>
          {post.tags.map((tag) => (
            <Link key={tag.id} href={`/blog/tag/${tag.slug}`} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-amber-100 hover:text-amber-600">
              {tag.name}
            </Link>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center gap-4">
          <span className="font-medium">Share:</span>
          <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"><Facebook className="w-5 h-5" /></button>
          <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"><Twitter className="w-5 h-5" /></button>
          <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"><Linkedin className="w-5 h-5" /></button>
        </div>
      </article>
    </div>
  );
}

