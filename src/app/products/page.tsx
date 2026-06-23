import Link from "next/link";
import Image from "next/image";
import { products } from "./productsData";

export default function ProductsPage() {
  const featuredProduct =
    products.find((product) => product.isFeatured) || products[0];

  const otherProducts = products.filter(
    (product) => product.id !== featuredProduct.id
  );

  return (
    <main className="min-h-screen bg-[#f8f9fb] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#E55503]">
            Our Products
          </span>

          <h1 className="mt-3 text-5xl font-bold text-[#002253]">
            Construction Equipment
          </h1>

          <p className="mt-4 max-w-2xl text-slate-500">
            Explore our complete range of construction machinery,
            lifting equipment, concrete solutions and industrial tools.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#06111F] p-6 text-white">
            <h3 className="text-4xl font-bold text-[#E55503]">
              50+
            </h3>
            <p className="mt-2 text-slate-300">
              Equipment Models
            </p>
          </div>

          <div className="rounded-3xl bg-[#06111F] p-6 text-white">
            <h3 className="text-4xl font-bold text-[#E55503]">
              300+
            </h3>
            <p className="mt-2 text-slate-300">
              Successful Deliveries
            </p>
          </div>

          <div className="rounded-3xl bg-[#06111F] p-6 text-white">
            <h3 className="text-4xl font-bold text-[#E55503]">
              98%
            </h3>
            <p className="mt-2 text-slate-300">
              Client Satisfaction
            </p>
          </div>
        </div>

        {/* Featured Product */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-[#1A2B40] bg-[#06111F]">
          <div className="grid lg:grid-cols-[1.7fr_1fr]">
            {/* Image */}
            <div className="relative h-[500px]">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-10 text-white">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E55503]">
                Featured Equipment
              </span>

              <h2 className="mt-4 text-4xl font-bold">
                {featuredProduct.title}
              </h2>

              <p className="mt-4 text-slate-300">
                {featuredProduct.description}
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <span className="text-[#E55503]">
                    Category
                  </span>

                  <p>{featuredProduct.category}</p>
                </div>

                {"modelId" in featuredProduct && (
                  <div>
                    <span className="text-[#E55503]">
                      Model
                    </span>

                    <p>{featuredProduct.modelId}</p>
                  </div>
                )}
              </div>

              <Link
                href={`/products/${featuredProduct.id}`}
                className="mt-8 inline-flex w-fit rounded-xl bg-[#E55503] px-6 py-3 font-semibold text-white transition hover:bg-[#c94a00]"
              >
                View Product →
              </Link>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#002253]">
            Explore Products
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {otherProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
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

                <h3 className="mt-2 text-xl font-bold text-[#002253]">
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