import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#E55503]/30 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 w-full bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#002253] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
          CPL Original
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-[#002253] mb-2">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 flex-1">
          {product.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-gray-100 py-4">
          {product.specs.map((spec, i) => (
            <div key={i}>
              <span className="block text-xs text-gray-400 uppercase font-semibold">
                {spec.label}
              </span>
              <span className="block text-lg font-bold text-[#224B88]">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Models List */}
        <div className="mb-6">
          <span className="text-xs text-gray-400 uppercase font-semibold mb-2 block">
            Popular Models:
          </span>
          <div className="flex flex-wrap gap-2">
            {product.models.map((model, i) => (
              <span
                key={i}
                className="bg-gray-50 text-[#002253] text-xs px-2 py-1 rounded border border-gray-100"
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="#"
          className="w-full bg-transparent border-2 border-[#224B88] text-[#224B88] hover:bg-[#224B88] hover:text-white font-bold py-3 rounded transition-colors duration-300 text-center"
        >
          View Specifications
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
