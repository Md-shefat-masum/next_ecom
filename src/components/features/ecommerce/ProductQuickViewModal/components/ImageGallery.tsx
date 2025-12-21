'use client';

import { useState } from 'react';
import Image from 'next/image';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  getImageUrl: (imageUrl: string) => string;
  shouldUnoptimize: (imageUrl: string) => boolean;
}

export default function ImageGallery({ 
  images, 
  productName, 
  getImageUrl, 
  shouldUnoptimize 
}: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="image-gallery">
        <div className="image-gallery-main">
          <div className="image-placeholder">No Image Available</div>
        </div>
      </div>
    );
  }

  const mainImage = images[selectedImageIndex] || images[0];
  const mainImageUrl = getImageUrl(mainImage);

  return (
    <div className="image-gallery">
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="image-gallery-thumbnails">
          {images.map((image, index) => {
            const imageUrl = getImageUrl(image);
            return (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`image-gallery-thumbnail ${
                  selectedImageIndex === index ? 'active' : ''
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={`${productName} - View ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
                  unoptimized={shouldUnoptimize(imageUrl)}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image */}
      <div className="image-gallery-main">
        <Image
          src={mainImageUrl}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
          unoptimized={shouldUnoptimize(mainImageUrl)}
        />
      </div>
    </div>
  );
}

