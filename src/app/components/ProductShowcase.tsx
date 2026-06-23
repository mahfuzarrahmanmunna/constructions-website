"use client";
import { products } from "@/app/products/productsData";
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";



export default function ProductShowcase(){
 

  return (
        <div>
            <section className="py-24 bg-[#f5f5f7]">
  <div className="max-w-[1600px] mx-auto px-6">

    <div className="mb-12">
      <span className="text-[#E55503] font-semibold">
        OUR PRODUCTS
      </span>

      <h2 className="mt-3 text-5xl font-bold text-[#002253]">
        Featured Equipment
      </h2>
    </div>

    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      centeredSlides
      autoplay={{
        delay: 3000,
      }}
      pagination={{
        clickable: true,
      }}
      slidesPerView={1.2}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>
        </div>
  );
}