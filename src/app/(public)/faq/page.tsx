'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.' },
      { q: 'Can I track my order?', a: 'Yes, you will receive a tracking number via email once your order ships.' },
      { q: 'Do you ship internationally?', a: 'Currently we ship within Bangladesh. International shipping coming soon.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We offer 30-day returns for unused items in original packaging.' },
      { q: 'How do I initiate a return?', a: 'Go to your account, select the order, and click "Request Return".' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive the returned item.' },
    ]
  },
  {
    category: 'Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept credit cards, debit cards, bKash, Nagad, and cash on delivery.' },
      { q: 'Is my payment information secure?', a: 'Yes, all transactions are encrypted and processed through secure payment gateways.' },
    ]
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {faqs.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-xl font-bold mb-4 text-amber-600">{category.category}</h2>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => {
                const id = `${catIndex}-${itemIndex}`;
                const isOpen = openItems.includes(id);
                return (
                  <div key={id} className="bg-white rounded-lg shadow-sm">
                    <button
                      onClick={() => toggleItem(id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center"
                    >
                      <span className="font-medium">{item.q}</span>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-gray-600">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

