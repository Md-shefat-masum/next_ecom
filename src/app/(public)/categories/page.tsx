import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { name: 'Electronics', slug: 'electronics', image: null, count: 150 },
    { name: 'Fashion', slug: 'fashion', image: null, count: 320 },
    { name: 'Home & Garden', slug: 'home-garden', image: null, count: 85 },
    { name: 'Sports', slug: 'sports', image: null, count: 120 },
    { name: 'Books', slug: 'books', image: null, count: 200 },
    { name: 'Beauty', slug: 'beauty', image: null, count: 95 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {category.image ? (
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">📦</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold group-hover:text-amber-600 transition">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

