'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingCart, Share2, Minus, Plus, Star, ChevronRight } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Placeholder product
  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    slug: params.slug,
    price: 5000,
    discount_price: 3999,
    images: [null, null, null],
    rating: 4.5,
    reviews_count: 128,
    sku: 'WH-001',
    brand: { name: 'SoundMax', slug: 'soundmax' },
    category: { name: 'Electronics', slug: 'electronics' },
    short_description: 'Experience premium sound quality with our wireless headphones.',
    description: '<p>These premium wireless headphones deliver exceptional audio quality with deep bass and crystal-clear highs. Features include:</p><ul><li>40mm drivers for immersive sound</li><li>Active noise cancellation</li><li>30-hour battery life</li><li>Comfortable memory foam ear cushions</li></ul>',
    in_stock: true,
    stock_quantity: 50,
  };

  const discount = product.discount_price ? Math.round((1 - product.discount_price / product.price) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-amber-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-amber-600">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/categories/${product.category.slug}`} className="hover:text-amber-600">{product.category.name}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            {product.images[selectedImage] ? (
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === i ? 'border-amber-500' : 'border-transparent'}`}
              >
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : 'No img'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-500">({product.reviews_count} reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-amber-600">৳{product.discount_price || product.price}</span>
            {product.discount_price && (
              <>
                <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.short_description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            {product.in_stock ? (
              <span className="text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                In Stock ({product.stock_quantity} available)
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100">
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-16 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button className="flex-1 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50"><Heart className="w-5 h-5" /></button>
            <button className="p-3 border rounded-lg hover:bg-gray-50"><Share2 className="w-5 h-5" /></button>
          </div>

          {/* Meta */}
          <div className="border-t pt-6 space-y-2 text-sm">
            <p><span className="text-gray-500">SKU:</span> {product.sku}</p>
            <p><span className="text-gray-500">Brand:</span> <Link href={`/brands/${product.brand.slug}`} className="text-amber-600 hover:underline">{product.brand.name}</Link></p>
            <p><span className="text-gray-500">Category:</span> <Link href={`/categories/${product.category.slug}`} className="text-amber-600 hover:underline">{product.category.name}</Link></p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b flex gap-8">
          {['description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-medium capitalize border-b-2 -mb-px transition ${activeTab === tab ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to review this product!</div>
          )}
        </div>
      </div>
    </div>
  );
}

