import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function BrandCard({ brand }: any) {
  return (
    <Link
      href={brand.url}
      className="group relative flex flex-col items-center p-8 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-100"
    >
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 p-4">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain mix-blend-multiply filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-medium text-gray-900">{brand.name}</h3>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="h-5 w-5 text-gray-600" />
        </span>
      </div>
    </Link>
  );
}