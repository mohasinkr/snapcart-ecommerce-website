import React from 'react';
import BrandCard from './BrandCard';

export const brands = [
  {
    id: 1,
    name: 'Nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    url: '#',
  },
  {
    id: 2,
    name: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f',
    url: '#',
  },
  {
    id: 3,
    name: 'Puma',
    logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    url: '#',
  },
  {
    id: 4,
    name: 'Under Armour',
    logo: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    url: '#',
  },
  {
    id: 5,
    name: 'New Balance',
    logo: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    url: '#',
  },
  {
    id: 6,
    name: 'Reebok',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    url: '#',
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Featured Brands
          </h2>
          <p className="text-lg text-gray-600">
            Discover our carefully curated collection of premium fashion brands
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}