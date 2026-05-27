"use client";

import { useState } from "react";
import { getImageUrl } from "./utils";
import "./ImageGallery.css";

export function ImageGallery({ images, productName }) {
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
      {images.length > 1 ? (
        <div className="image-gallery-thumbnails">
          {images.map((image, index) => {
            const imageUrl = getImageUrl(image);
            return (
              <button
                key={`gallery-thumb-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`image-gallery-thumbnail ${selectedImageIndex === index ? "active" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={`${productName} - View ${index + 1}`} loading="lazy" />
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="image-gallery-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mainImageUrl} alt={productName} className="image-gallery-main-img" />
      </div>
    </div>
  );
}
