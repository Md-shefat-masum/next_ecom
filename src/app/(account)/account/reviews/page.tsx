'use client';

import Link from 'next/link';
import { Star, Edit2, Trash2 } from 'lucide-react';

export default function MyReviewsPage() {
  const reviews = [
    { id: 1, product: { name: 'Wireless Headphones', slug: 'wireless-headphones', image: null }, rating: 5, review: 'Excellent product! Great sound quality.', status: 'approved', date: '2024-01-15' },
    { id: 2, product: { name: 'Smart Watch', slug: 'smart-watch', image: null }, rating: 4, review: 'Good watch, battery life could be better.', status: 'pending', date: '2024-01-10' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                {review.product.image && (
                  <img src={review.product.image} alt={review.product.name} className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/products/${review.product.slug}`} className="font-semibold hover:text-amber-600">
                      {review.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        review.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {review.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 mt-2">{review.review}</p>
                <div className="flex gap-2 mt-4">
                  <button className="text-sm text-gray-500 hover:text-amber-600 flex items-center gap-1">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

