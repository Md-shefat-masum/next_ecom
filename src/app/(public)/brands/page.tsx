import Link from 'next/link';

export default function BrandsPage() {
  const brands = [
    { name: 'Apple', slug: 'apple', logo: null, count: 45 },
    { name: 'Samsung', slug: 'samsung', logo: null, count: 78 },
    { name: 'Sony', slug: 'sony', logo: null, count: 52 },
    { name: 'Nike', slug: 'nike', logo: null, count: 120 },
    { name: 'Adidas', slug: 'adidas', logo: null, count: 95 },
    { name: 'Puma', slug: 'puma', logo: null, count: 68 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Brands</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="group bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="w-12 h-12 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-gray-400">{brand.name[0]}</span>
              )}
            </div>
            <h3 className="font-semibold group-hover:text-amber-600 transition">{brand.name}</h3>
            <p className="text-sm text-gray-500">{brand.count} products</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

