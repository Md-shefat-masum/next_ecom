'use client';

import { useState } from 'react';
import { RouteData, Product } from '@/types';
import { Heart, ShoppingCart, Share2, Minus, Plus, Star } from 'lucide-react';

interface ProductDetailsViewProps {
  data: RouteData;
}

export default function ProductDetailsView({ data }: ProductDetailsViewProps) {
  const product = data.data as Product;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.gallery || [product.image];
  const discount = product.discount_price 
    ? Math.round((1 - product.discount_price / product.price) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            {images[selectedImage] ? (
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === i ? 'border-amber-500' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-gray-500">({product.reviews_count || 0} reviews)</span>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-amber-600">
              ৳{product.discount_price || product.price}
            </span>
            {product.discount_price && (
              <>
                <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded">-{discount}%</span>
              </>
            )}
          </div>

          {product.short_description && (
            <p className="text-gray-600 mb-6">{product.short_description}</p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
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
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Meta */}
          <div className="border-t pt-6 space-y-2 text-sm">
            {product.sku && <p><span className="text-gray-500">SKU:</span> {product.sku}</p>}
            {product.brand && <p><span className="text-gray-500">Brand:</span> {product.brand.name}</p>}
            {product.category && <p><span className="text-gray-500">Category:</span> {product.category.name}</p>}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}
    </div>
  );
}

