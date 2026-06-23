/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductCard({
  product,
}: {
  product: any;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <span className="text-xs uppercase tracking-wider text-[#E55503]">
          {product.category}
        </span>

        <h3 className="mt-2 text-2xl font-bold text-[#002253]">
          {product.title}
        </h3>

        <p className="mt-3 text-slate-500">
          {product.description}
        </p>

        <button className="mt-5 flex items-center gap-2 text-[#E55503]">
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}