import { Product } from '@/types';

export interface BannerProduct extends Product {
    full_image_url?: string;
}

export interface SlideContent {
    type: 'v1' | 'v2';
    products: BannerProduct[];
}

/**
 * Transform API banner data to slide content
 * API structure: [[[5 products][3 products]], [[[5 products][3 products]], ...]
 * Each API slide contains: [[5 products for v1], [3 products for v2]]
 */
export function transformBannerData(
    bannerData: BannerProduct[][][] | undefined
): SlideContent[] {
    if (!bannerData || bannerData.length === 0) {
        return [];
    }

    const slideContent: SlideContent[] = [];

    bannerData.forEach((apiSlide: BannerProduct[][]) => {
        // apiSlide[0] = 5 products for v1 layout
        // apiSlide[1] = 3 products for v2 layout

        if (apiSlide[0] && apiSlide[0].length > 0) {
            slideContent.push({
                type: 'v1',
                products: apiSlide[0],
            });
        }

        if (apiSlide[1] && apiSlide[1].length > 0) {
            slideContent.push({
                type: 'v2',
                products: apiSlide[1],
            });
        }
    });

    return slideContent;
}

/**
 * Get product image URL
 * Handles full_image_url, relative paths, and fallback
 */
export function getProductImageUrl(product: BannerProduct | null): string {
    if (!product) {
        return '/placeholder-product.jpg';
    }

    // Use full_image_url if available
    if (product.full_image_url) {
        return product.full_image_url;
    }

    // If image is a relative path, prepend API base URL
    if (product.image && !product.image.startsWith('http')) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        return `${apiBaseUrl}/${product.image}`;
    }

    // Fallback to image or placeholder
    return product.image || '/placeholder-product.jpg';
}

/**
 * Get product URL
 */
export function getProductUrl(product: BannerProduct | null): string {
    if (!product || !product.slug) {
        return '#';
    }
    return `/products/${product.slug}`;
}

/**
 * Check if image should be unoptimized (for http:// URLs in dev)
 */
export function shouldUnoptimizeImage(imageUrl: string): boolean {
    return imageUrl.startsWith('http://');
}

