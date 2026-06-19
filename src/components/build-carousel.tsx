import Image from "next/image";

const solutions = [
  { title: "Excavation", image: "/category/1st.png" },
  { title: "Heavy lifting", image: "/category/2nd.png" },
  { title: "Road construction", image: "/category/3rd.png" },
];

export function BuildCarousel() {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-[var(--color-accent-light)]">Built for every challenge</p>
      <h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] md:text-5xl">Find the right equipment for your next project</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {solutions.map((solution) => (
          <article key={solution.title} className="group overflow-hidden rounded-[var(--radius-card)] bg-white/8">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={solution.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <h3 className="p-5 text-xl font-black">{solution.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
