"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

export function ProductDetailsGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] || images[0];

  return (
    <section className="pdv1_gallery" aria-label={`${productName} images`}>
      <div className="pdv1_mainImageBox">
        {selectedImage ? (
          <img className="pdv1_mainImage" src={selectedImage} alt={productName} />
        ) : (
          <div className="pdv1_noImage">No Image</div>
        )}
      </div>

      {images.length > 1 ? (
        <div className="pdv1_thumbRow">
          {images.slice(0, 6).map((image, index) => (
            <button
              className={`pdv1_thumb${selectedIndex === index ? " is-active" : ""}`}
              key={image}
              onClick={() => setSelectedIndex(index)}
              type="button"
            >
              <img src={image} alt={`${productName} ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
