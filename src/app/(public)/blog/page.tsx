import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    { id: 1, title: 'Top 10 Tech Gadgets of 2024', slug: 'top-10-tech-gadgets', excerpt: 'Discover the most innovative tech gadgets...', date: '2024-01-15', author: 'John Doe', image: null },
    { id: 2, title: 'Fashion Trends This Season', slug: 'fashion-trends', excerpt: 'Stay ahead with the latest fashion trends...', date: '2024-01-10', author: 'Jane Smith', image: null },
    { id: 3, title: 'Home Decor Ideas', slug: 'home-decor-ideas', excerpt: 'Transform your living space with these ideas...', date: '2024-01-05', author: 'Mike Johnson', image: null },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-amber-600 transition">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-amber-600 hover:underline flex items-center gap-1">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

