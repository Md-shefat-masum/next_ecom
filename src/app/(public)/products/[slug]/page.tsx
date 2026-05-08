'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  AtSign,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  MessageCircleQuestion,
  Phone,
  Truck,
  Headphones,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  // Placeholder product
  const product = {
    id: 1,
    name: 'Rapoo M10 Plus Wireless Mouse',
    slug: params.slug,
    price: 599,
    discount_price: 550,
    images: [
      'https://bme.com.bd/uploads/products/photos/R4LGvHJoQWRqbeiC86D9rYGkeMg8KFU37Rola6TT.jpeg',
      'https://bme.com.bd/uploads/products/photos/QbtiGq6Mq8aXZZBXJ6alAsQk6OyuSGn0pePeiXsI.jpeg',
      'https://bme.com.bd/uploads/products/photos/R4LGvHJoQWRqbeiC86D9rYGkeMg8KFU37Rola6TT.jpeg',
    ],
    rating: 5,
    reviews_count: 0,
    sku: '9.61.151.6042',
    brand: { name: 'RAPOO', slug: 'rapoo' },
    category: { name: 'Wireless Mouse', slug: 'wireless-mouse' },
    short_description:
      'Stable 2.4GHz wireless connectivity, smooth cursor tracking, plug-and-play USB receiver, and long battery life.',
    description:
      '<h2><strong>Rapoo M10 Plus Wireless Mouse Price in Bangladesh</strong></h2><p>The Rapoo M10 Plus Wireless Mouse is a practical and affordable wireless mouse designed for everyday computer use in homes, offices, schools, and workplaces across Bangladesh.</p><h2>Key Features</h2><ul><li>Stable 2.4GHz wireless connectivity</li><li>Compact and lightweight design</li><li>Symmetrical shape for left- and right-handed users</li><li>Smooth and accurate cursor tracking</li><li>Plug-and-play USB receiver</li><li>Energy-efficient operation with long battery life</li></ul>',
    in_stock: true,
    stock_quantity: 50,
  };

  const discount = product.discount_price ? Math.round((1 - product.discount_price / product.price) * 100) : 0;
  const paymentOptions = [
    {
      title: `৳${product.discount_price?.toFixed(2)}`,
      subtitle: 'Cash Discount Price',
      description: 'Online / Cash Payment',
      active: true,
    },
    {
      title: '৳49.92/month',
      subtitle: 'Regular Price: ৳599.00',
      description: '0% EMI for 3/6 Months',
      active: false,
    },
  ];

  const productFeatures = [
    '✅ 360-Degree Coverage',
    '✅ Interface: USB Receiver',
    '✅ Connectivity: 2.4 GHz Wireless',
    '✅ Optical Sensor Resolution: 1000',
    '✅ Max DPI: 1000 DPI, Battery Type: AA',
  ];

  const sidebarFeatures = [
    {
      icon: <Headphones className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Support',
      desc: 'Saturday – Thursday: 09 AM - 06 PM.',
    },
    {
      icon: <Phone className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Hotline',
      desc: '0967 881 4452',
    },
    {
      icon: <MessageCircleQuestion className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Whatsapp',
      desc: '+880170 999 8397',
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Payment',
      desc: 'Cash on Delivery | Card | Online Payment',
    },
    {
      icon: <Truck className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Shipping Cost',
      desc: 'Inside Dhaka 120tk | Outside Dhaka 150tk',
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-[#1f4fb2]" />,
      title: 'Warranty Policy',
      desc: 'Read More',
    },
  ];

  const similarProducts = [
    { name: 'Logitech M221 Silent Wireless Mouse', price: '৳1,499.00', slug: '/logitech-m221-silent-wireless-mouse' },
    { name: 'Logitech M187 Mini Wireless Mouse', price: '৳1,399.00', slug: '/logitech-m187-wireless-mouse' },
    { name: 'A4TECH FB12 Fstyler Dual Mode Wireless Mouse', price: '৳1,299.00', slug: '/a4tech-fb12-dual-mode-wireless-mouse' },
    { name: 'A4Tech FB35C Multimode Rechargeable Wireless Mouse', price: '৳1,800.00', slug: '/a4tech-fb35c-rechargeable-wireless-mouse' },
  ];

  const recentProducts = [
    { name: 'Rapoo M10 Plus Wireless Mouse', price: '৳550.00', slug: '/rapoo-m10-plus-wireless-mouse' },
  ];

  const bestSellingProducts = [
    { name: 'Rapoo VPRO VT9 AIR LITE Dual-Mode Wireless Gaming Mouse', price: '৳4,599.00', slug: '/rapoo-vpro-vt9-air-lite-dual-mode-wireless-gaming-mouse' },
    { name: 'Rapoo MT760L Rechargeable Tri-Mode Wireless Mouse', price: '৳4,700.00', slug: '/rapoo-mt760l-rechargeable-tri-mode-wireless-mouse' },
    { name: 'Rapoo MT760 Mini Rechargeable Tri-mode Wireless Mouse', price: '৳4,650.00', slug: '/rapoo-mt760-mini-rechargeable-tri-mode-wireless-mouse' },
    { name: 'Rapoo MT560 Multi-mode Wireless Mouse', price: '৳3,299.00', slug: '/rapoo-mt560-multi-mode-wireless-mouse' },
  ];

  const trustItems = [
    {
      icon: <BadgeCheck className="h-11 w-11 text-[#1f4fb2]" />,
      title: 'Secured Online Payment',
      desc: 'You can transaction by all major master cards, mobile and internet banking.',
    },
    {
      icon: <ShoppingCart className="h-11 w-11 text-[#1f4fb2]" />,
      title: 'Cash on Delivery',
      desc: 'Cash receiving the products buy.',
    },
    {
      icon: <Headphones className="h-11 w-11 text-[#1f4fb2]" />,
      title: 'Customer Support',
      desc: 'Saturday – Thursday: 9 AM - 6 PM.',
    },
  ];

  return (
    <div className="bg-[#f6f7fb] pb-16">
      <section className="product-details-area">
        <div className="container mx-auto max-w-450 px-4 py-6 lg:px-6">
          <div className="bg-white">
            <div className="grid grid-cols-12 gap-0 lg:gap-4">
              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-4 rounded-none bg-white p-4">
                  <div className="text-center">
                    <div className="mx-auto flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-50">
                      <Image
                        src={product.images[selectedImage] || product.images[0]}
                        alt={product.name}
                        width={900}
                        height={900}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-4 hidden gap-3 md:flex">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`h-20 w-20 overflow-hidden border transition ${selectedImage === i ? 'border-amber-500' : 'border-transparent'}`}
                      >
                        <Image src={img} alt="" width={120} height={120} unoptimized className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <div className="p-4 lg:p-6">
                  <h1 className="mb-2 text-3xl font-semibold text-gray-900">{product.name}</h1>

                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500">Cash Price:</span>
                    <b className="text-xl text-gray-900">৳{product.discount_price?.toFixed(2)}</b>
                  </div>

                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500">Regular Price:</span>
                    <b className="text-gray-900">৳{product.price.toFixed(2)}</b>
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">-{discount}%</span>
                  </div>

                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-500">Availability:</span>
                    <b className="text-emerald-600">{product.in_stock ? 'In Stock' : 'Out of Stock'}</b>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-500">SKU:</span>
                    <b>{product.sku}</b>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <h5 className="mb-3 text-lg font-semibold text-gray-900">Quick Overview</h5>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Brand:</span>
                      <Link href={`/brands/${product.brand.slug}`} className="font-semibold uppercase text-emerald-700 hover:underline">
                        {product.brand.name}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">M10 Plus</span>
                    </div>
                  </div>

                  <form id="option-choice-form" className="mt-6">
                    <div className="rounded-lg bg-white">
                      <div className="row" id="chosen_price_div">
                        <div className="col-12">
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                            {productFeatures.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                          <strong>
                            <a href="#viewMore" className="text-sm font-semibold text-gray-900 hover:text-amber-600">
                              View More
                            </a>
                          </strong>
                          <button type="button" className="text-sm font-semibold text-gray-900 hover:text-amber-600">
                            Wishlist
                          </button>
                          <button type="button" className="text-sm font-semibold text-gray-900 hover:text-amber-600">
                            Compare
                          </button>
                        </div>

                        <div className="mt-4 flex items-center gap-1 text-sm text-amber-500">
                          <span>Rating:</span>
                          <span className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </span>
                          <span className="ml-1 text-gray-500">(0 Reviews)</span>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4 border-gray-200" />

                    <div>
                      <h5 className="mb-3 text-lg font-semibold text-gray-900">Payment Options</h5>
                      <div className="grid gap-5 md:grid-cols-2">
                        {paymentOptions.map((option) => (
                          <label
                            key={option.title}
                            className={`flex cursor-pointer items-start gap-4 border-2 bg-white px-4 py-3 transition ${option.active ? 'border-[#1f4fb2]' : 'border-gray-200'}`}
                          >
                            <span className={`mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${option.active ? 'border-[#1f4fb2]' : 'border-gray-400'}`}>
                              <span className={`h-3.5 w-3.5 rounded-full ${option.active ? 'bg-[#1f4fb2]' : 'bg-transparent'}`} />
                            </span>

                            <input type="radio" name="enable_emi" checked={option.active} value={option.active ? '0' : '1'} readOnly className="hidden" />

                            <div className="min-w-0 pt-0.5 text-left">
                              <span className="block text-base font-semibold text-gray-900">{option.title}</span>
                              <div className="mt-1 text-sm text-gray-700">{option.subtitle}</div>
                              <div className="mt-0.5 text-sm text-gray-700">{option.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <div className="flex w-fit items-center border border-[#1f4fb2] bg-white">
                        <button
                          className="h-12 w-12 border-r border-[#1f4fb2] text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                          type="button"
                          data-type="minus"
                          disabled={quantity <= 1}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="mx-auto h-4 w-4" />
                        </button>
                        <input
                          type="text"
                          name="quantity"
                          value={quantity}
                          readOnly
                          className="h-12 w-20 border-none text-center text-sm font-medium outline-none"
                        />
                        <button
                          className="h-12 w-12 border-l border-[#1f4fb2] text-gray-700"
                          type="button"
                          data-type="plus"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="mx-auto h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="inline-flex h-12 items-center gap-2 bg-[#1f4fb2] px-5 font-semibold text-white transition hover:bg-[#163c88]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-12 items-center gap-2 bg-[#1f4fb2] px-5 font-semibold text-white transition hover:bg-[#163c88]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Cart
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-12 items-center gap-2 bg-[#1f4fb2] px-5 font-semibold text-white transition hover:bg-[#163c88]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Quotation
                      </button>
                    </div>

                    <div className="mt-8 flex items-center gap-8">
                      <span className="text-base text-gray-900">Share:</span>
                      <div className="flex items-center gap-2">
                        <button type="button" className="flex h-8 w-8 items-center justify-center bg-[#2b87f3] text-white">
                          <AtSign className="h-4 w-4" />
                        </button>
                        <button type="button" className="flex h-8 w-8 items-center justify-center bg-[#1da1f2] text-white">
                          <Twitter className="h-4 w-4" />
                        </button>
                        <button type="button" className="flex h-8 w-8 items-center justify-center bg-[#3b5998] text-white">
                          <Facebook className="h-4 w-4" />
                        </button>
                        <button type="button" className="flex h-8 w-8 items-center justify-center bg-[#0a66c2] text-white">
                          <Linkedin className="h-4 w-4" />
                        </button>
                        <button type="button" className="flex h-8 w-8 items-center justify-center bg-[#25d366] text-white">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-3">
                <div className="space-y-4 p-4 lg:p-6">
                  <div className="space-y-3">
                    <ul className="space-y-3">
                      {sidebarFeatures.map((item) => (
                        <li
                          key={item.title}
                          className="flex items-center gap-4 border border-[#1f4fb2] bg-[#f8f8f8] px-5 py-4"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold leading-tight text-gray-800">{item.title}</h3>
                            <span className="mt-1 block text-sm leading-snug text-gray-800">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-span-12 px-4 pb-4 lg:px-6">
                <div className="mt-4 border-t bg-white p-4">
                  <div className="flex flex-wrap gap-8 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setActiveTab('description')}
                      className={`pb-3 text-sm font-semibold uppercase tracking-wide transition ${activeTab === 'description' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Description
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('reviews')}
                      className={`pb-3 text-sm font-semibold uppercase tracking-wide transition ${activeTab === 'reviews' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Reviews
                    </button>
                  </div>

                  <div className="py-6">
                    {activeTab === 'description' && (
                      <div>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />

                        <div className="mt-8 rounded-xl bg-gray-50 p-4">
                          <h3 className="mb-3 text-xl font-bold text-gray-900">What is the price of {product.name} in Bangladesh?</h3>
                          <p className="text-gray-700">
                            The latest price of {product.name} in Bangladesh is {product.discount_price ? `৳${product.discount_price.toFixed(2)}` : `৳${product.price.toFixed(2)}`}. You can buy this product from BME ONLINE SHOP, Bangladesh.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="text-center text-sm text-gray-500">No reviews yet. Be the first to review this product!</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-12 px-4 lg:px-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                  <div className="space-y-6">
                    <section id="Description" className="bg-white p-4 shadow-sm ring-1 ring-gray-100">
                      <div className="mb-4 border-b border-gray-200 pb-3">
                        <h3 className="text-xl font-bold text-gray-900">Description</h3>
                      </div>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </section>

                    <section className="bg-white p-4 shadow-sm ring-1 ring-gray-100" id="viewMore">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">Write a review</h3>
                      <form className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <input className="w-full rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-amber-500" placeholder="Your name" />
                          <input className="w-full rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-amber-500" placeholder="Email" />
                        </div>
                        <textarea className="w-full rounded border border-gray-300 px-4 py-3 text-sm outline-none focus:border-amber-500" rows={4} placeholder="Your review" />
                        <div className="flex justify-end">
                          <button type="button" className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600">
                            Send review
                          </button>
                        </div>
                      </form>
                    </section>

                    <section className="bg-white p-4 shadow-sm ring-1 ring-gray-100">
                      <div className="mb-4 border-b border-gray-200 pb-3">
                        <h3 className="text-xl font-bold text-gray-900">Question Answer</h3>
                      </div>
                      <p className="mb-4 text-gray-700">
                        Have question about this product? Get specific details about this product from expert.
                      </p>
                      <button type="button" className="rounded-full bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800">
                        Ask Question
                      </button>
                    </section>
                  </div>

                  <aside className="space-y-6">
                    <section className="bg-white p-4 shadow-sm ring-1 ring-gray-100">
                      <h3 className="mb-4 text-lg font-bold text-gray-900">Similar Products</h3>
                      <div className="space-y-4">
                        {similarProducts.map((item) => (
                          <div key={item.slug} className="flex gap-3">
                            <div className="h-20 w-20 shrink-0 overflow-hidden bg-gray-100">
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">Image</div>
                            </div>
                            <div>
                              <Link href={item.slug} className="block text-sm font-semibold text-gray-900 hover:text-amber-600">
                                {item.name}
                              </Link>
                              <div className="mt-1 flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                                ))}
                              </div>
                              <div className="mt-1 text-sm font-semibold text-gray-700">{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white p-4 shadow-sm ring-1 ring-gray-100">
                      <h3 className="mb-4 text-lg font-bold text-gray-900">Recent Products</h3>
                      <div className="space-y-4">
                        {recentProducts.map((item) => (
                          <div key={item.slug} className="flex gap-3">
                            <div className="h-20 w-20 shrink-0 overflow-hidden bg-gray-100">
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">Image</div>
                            </div>
                            <div>
                              <Link href={item.slug} className="block text-sm font-semibold text-gray-900 hover:text-amber-600">
                                {item.name}
                              </Link>
                              <div className="mt-1 flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                                ))}
                              </div>
                              <div className="mt-1 text-sm font-semibold text-gray-700">{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </aside>
                </div>
              </div>

              <div className="col-span-12 px-4 pb-8 lg:px-6">
                <section className="mt-6 bg-white p-4 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Best Selling Products</h3>
                    <span className="text-sm font-semibold text-gray-500">Top 20</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {bestSellingProducts.map((item) => (
                      <div key={item.slug} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="mb-3 h-36 w-full bg-white">
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">Product Image</div>
                        </div>
                        <Link href={item.slug} className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-amber-600">
                          {item.name}
                        </Link>
                        <div className="mt-2 flex items-center gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-gray-700">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-span-12 bg-white px-4 py-8 lg:px-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {trustItems.map((item) => (
                    <div key={item.title} className="flex flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center">{item.icon}</div>
                      <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

