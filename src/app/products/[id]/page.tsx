import Link from "next/link";
import Image from "next/image";
import { products } from "./productsData";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#E55503]">
            CPL Products
          </span>

          <h1 className="mt-4 text-5xl font-bold text-[#002253]">
            Construction Equipment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Explore our complete range of construction machinery,
            lifting equipment, concrete solutions and industrial tools.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-[#E55503]">
                  {product.category}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#002253]">
                  {product.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-slate-500">
                  {product.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-[#E55503]">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}