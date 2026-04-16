import Link from 'next/link';

export default function CollectionsPage() {
  const collections = [
    { name: 'Summer Collection', slug: 'summer-collection', image: null, count: 45, description: 'Hot deals for summer' },
    { name: 'Best Sellers', slug: 'best-sellers', image: null, count: 120, description: 'Our most popular products' },
    { name: 'New Arrivals', slug: 'new-arrivals', image: null, count: 35, description: 'Fresh products just in' },
    { name: 'Flash Sale', slug: 'flash-sale', image: null, count: 28, description: 'Limited time offers' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white h-64"
          >
            {collection.image && (
              <img src={collection.image} alt={collection.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition">{collection.name}</h2>
              <p className="text-gray-300 mb-2">{collection.description}</p>
              <span className="text-sm text-amber-400">{collection.count} products</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

