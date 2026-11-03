"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, reducido } from "@/lib/gsap";
import { Flotar, PalabraGigante, Subir } from "./Movimiento";

/* HERO QUE SE DESVANECE: la foto crece y se oscurece, el texto sube y se desenfoca.
   Envolver <HeroDesvanece/> + <SubeEncima> en un <div> para que el sticky termine ahí. */
export function HeroDesvanece({ imagen, alt, palabra, texto, enlace, tarjetas }:
  { imagen: string; alt: string; palabra: string; texto: string; enlace: { texto: string; href: string }; tarjetas?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducido()) return;
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    tl.to(".fondo", { scale: 1.2, yPercent: 6 }, 0).to(".velo", { opacity: 0.85 }, 0);
    gsap.utils.toArray<HTMLElement>(".sale-texto").forEach((t, i) => tl.to(t, { yPercent: -40 - i * 15, opacity: 0, filter: "blur(6px)" }, 0));
  }, { scope: ref });
  return (
    <section ref={ref} className="sticky top-0 isolate flex h-svh min-h-[640px] flex-col justify-end overflow-hidden bg-neutral-950 px-[max(20px,5vw)] pb-7 text-white">
      <Image src={imagen} alt={alt} fill priority className="fondo -z-20 object-cover object-[50%_30%]" sizes="100vw" />
      <div className="velo absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />
      <div className="sale-texto mb-7 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-4 max-w-[30ch] text-[clamp(18px,1.6vw,22px)] font-medium leading-snug">{texto}</p>
          <a href={enlace.href} target="_blank" rel="noopener" className="font-medium underline underline-offset-4">{enlace.texto}</a>
        </div>
        {tarjetas && <div className="hidden justify-items-end gap-3 sm:grid">{tarjetas}</div>}
      </div>
      <div className="sale-texto"><PalabraGigante texto={palabra} className="font-semibold" /></div>
    </section>
  );
}

// Sección que sube encima del hero
export function SubeEncima({ id, children }: { id?: string; children: React.ReactNode }) {
  return <section id={id} className="relative z-10 -mt-8 overflow-x-clip rounded-t-[32px] bg-papel px-[max(20px,5vw)] pb-10 pt-[clamp(80px,10vw,140px)]">{children}</section>;
}

// Tarjeta de vidrio para poner sobre fotos
export function TarjetaVidrio({ oscura = false, children }: { oscura?: boolean; children: React.ReactNode }) {
  return <div className={`vidrio grid w-[250px] gap-1.5 rounded-[18px] p-4 ${oscura ? "!bg-black/55" : ""}`}>{children}</div>;
}

/* CONSTELACIÓN: imagen en óvalo inclinado con 4 tarjetas sueltas alrededor */
type Suelta = { icono: LucideIcon; titulo: string; texto: string };
const posiciones = ["md:left-[6%] md:top-[46%]", "md:left-[25%] md:top-[2%]", "md:right-[22%] md:top-[58%]", "md:right-[4%] md:top-[22%]"];
export function Constelacion({ imagen, alt, tarjetas }: { imagen: string; alt: string; tarjetas: Suelta[] }) {
  return (
    <div className="relative grid grid-cols-2 place-items-center gap-3.5 md:min-h-[760px] md:grid-cols-1">
      <Subir className="col-span-2 my-6 w-[80%] md:col-span-1 md:my-0 md:w-[min(520px,70%)]">
        <div className="relative aspect-[1/1.35] -rotate-[24deg] overflow-hidden rounded-[50%]">
          <Image src={imagen} alt={alt} fill className="rotate-[24deg] scale-[1.35] object-cover" sizes="520px" />
        </div>
      </Subir>
      {tarjetas.slice(0, 4).map(({ icono: Icono, titulo, texto }, i) => (
        <Flotar key={titulo} velocidad={[0.15, 0.3, 0.22, 0.4][i]} className={`md:absolute md:w-[min(270px,40%)] ${posiciones[i]}`}>
          <article className="grid justify-items-center gap-2.5 rounded-[14px] bg-acento-2/50 px-5 py-6 text-center shadow-[0_30px_50px_-40px_rgb(10_50_60/.4)]">
            <span className="grid size-[54px] place-items-center rounded-full bg-papel text-acento"><Icono size={20} /></span>
            <h3 className="text-lg font-semibold leading-tight">{titulo}</h3>
            <p className="text-[15px] text-suave">{texto}</p>
          </article>
        </Flotar>
      ))}
    </div>
  );
}

/* CIFRAS con "+" en color acento */
export function Cifras({ items }: { items: { valor: React.ReactNode; texto: string; mas?: boolean }[] }) {
  return (
    <Subir grupo className="mt-10 grid grid-cols-2 gap-6 border-t border-linea pt-16 md:grid-cols-4">
      {items.map((c) => (
        <div key={c.texto}>
          <b className="block text-[clamp(44px,5vw,76px)] font-semibold leading-none tracking-[-.045em]">{c.valor}{c.mas && <span className="text-acento">+</span>}</b>
          <span className="text-sm text-suave">{c.texto}</span>
        </div>
      ))}
    </Subir>
  );
}

/* DIVIDIDO: foto sticky a la izquierda, contenido a la derecha */
export function Dividido({ id, imagen, alt, nota, children }: { id?: string; imagen: string; alt: string; nota?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="grid items-start bg-papel md:grid-cols-2">
      <div className="relative h-[60vh] overflow-hidden md:sticky md:top-0 md:h-screen">
        <Image src={imagen} alt={alt} fill className="object-cover" sizes="50vw" />
        {nota && <div className="vidrio absolute inset-x-6 bottom-6 grid max-w-[340px] gap-1 rounded-[18px] !bg-black/40 px-5 py-4">{nota}</div>}
      </div>
      <div className="grid min-w-0 gap-12 px-[max(20px,5vw)] py-[clamp(48px,6vw,96px)] md:pl-[clamp(24px,4vw,64px)] [&>*]:min-w-0">{children}</div>
    </section>
  );
}

/* CARRUSEL con scroll-snap y flechas circulares */
export function Carrusel({ etiqueta, children, ancho = "md:auto-cols-[minmax(240px,46%)]" }: { etiqueta?: string; children: React.ReactNode; ancho?: string }) {
  const pista = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ inicio: true, fin: false });
  const mover = (dir: number) => {
    const p = pista.current; const item = p?.firstElementChild as HTMLElement | null;
    p?.scrollBy({ left: dir * ((item?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };
  const revisar = () => { const p = pista.current; if (!p) return; setPos({ inicio: p.scrollLeft <= 2, fin: p.scrollLeft >= p.scrollWidth - p.clientWidth - 2 }); };
  const flecha = "grid size-12 place-items-center rounded-full bg-tinta text-papel transition hover:scale-105 disabled:opacity-30";
  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex items-end justify-between gap-5">
        {etiqueta && <span className="font-mono text-xs uppercase tracking-[.1em] text-suave">{etiqueta}</span>}
        <div className="flex gap-2.5">
          <button type="button" aria-label="Anterior" disabled={pos.inicio} onClick={() => mover(-1)} className={flecha}><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Siguiente" disabled={pos.fin} onClick={() => mover(1)} className={flecha}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div ref={pista} onScroll={revisar} data-lenis-prevent-wheel className={`grid auto-cols-[80%] grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&>*]:snap-start ${ancho}`}>{children}</div>
    </div>
  );
}

// Tarjeta de servicio para el carrusel
export function TarjetaProducto({ imagen, alt, etiqueta, nombre, precio, detalle }: { imagen: string; alt: string; etiqueta?: string; nombre: string; precio: string; detalle?: string }) {
  return (
    <article className="group grid content-start gap-3.5 rounded-2xl bg-acento-2/40 p-3 even:bg-fondo">
      <div className="relative aspect-[1/1.05] overflow-hidden rounded-[10px]">
        <Image src={imagen} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:768px) 25vw, 80vw" />
        {etiqueta && <span className="absolute left-2.5 top-2.5 rounded-full bg-papel px-3 py-1.5 text-[13px] font-medium">{etiqueta}</span>}
      </div>
      <div className="flex items-end justify-between gap-3 px-1"><h3 className="text-lg font-medium leading-snug">{nombre}</h3><span className="whitespace-nowrap font-mono text-xs uppercase tracking-[.08em] text-acento">{precio}</span></div>
      {detalle && <p className="px-1 pb-1.5 text-sm text-suave">{detalle}</p>}
    </article>
  );
}

/* BENTO de 12 columnas. Celdas: acento, oscura, borde */
export function Bento({ children }: { children: React.ReactNode }) {
  return <Subir grupo className="grid grid-cols-1 gap-4 md:grid-cols-12">{children}</Subir>;
}
const estilos = { acento: "bg-acento text-white", oscura: "bg-tinta text-white", borde: "border border-acento/45 bg-papel" };
export function Celda({ span = 6, estilo = "borde", className, children }: { span?: 4 | 5 | 6 | 7 | 8; estilo?: keyof typeof estilos; className?: string; children: React.ReactNode }) {
  const col = { 4: "md:col-span-4", 5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8" }[span];
  return <article className={`relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-[26px] p-[clamp(24px,3vw,40px)] ${col} ${estilos[estilo]} ${className ?? ""}`}>{children}</article>;
}
// Objeto inclinado que se sale de la esquina de una celda
export function SeSale({ imagen, alt }: { imagen: string; alt: string }) {
  return (
    <Flotar velocidad={0.15} className="absolute -bottom-16 -right-10 aspect-[3/4] w-[min(300px,46%)] rotate-[-12deg] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-25px_rgb(0_0_0/.45)]">
      <Image src={imagen} alt={alt} fill className="object-cover" sizes="300px" />
    </Flotar>
  );
}

/* PREGUNTAS FRECUENTES en acordeón nativo */
export function Preguntas({ items }: { items: { pregunta: string; respuesta: React.ReactNode }[] }) {
  return (
    <Subir grupo className="mx-auto grid max-w-[880px] gap-3">
      {items.map((p) => (
        <details key={p.pregunta} className="group rounded-[20px] border border-linea bg-papel px-6 py-5 open:border-acento/45">
          <summary className="flex cursor-pointer items-center justify-between gap-6 text-[clamp(17px,1.4vw,20px)] font-medium">
            {p.pregunta}
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-acento-2 text-tinta transition-transform duration-300 group-open:rotate-45"><Plus size={16} /></span>
          </summary>
          <div className="pt-4 text-[15px] leading-relaxed text-suave">{p.respuesta}</div>
        </details>
      ))}
    </Subir>
  );
}

/* PIE: panel blanco sobre foto con la marca gigante desvaneciéndose */
export function PieSobreFoto({ imagen, marca, children }: { imagen: string; marca: string; children: React.ReactNode }) {
  return (
    <footer className="relative isolate px-3 py-[clamp(40px,6vw,80px)]">
      <Image src={imagen} alt="" fill className="-z-10 object-cover" sizes="100vw" />
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[32px] bg-papel p-[clamp(28px,5vw,72px)]">
        {children}
        <div className="mt-12"><PalabraGigante texto={marca} className="texto-desvanece font-extrabold" /></div>
      </div>
    </footer>
  );
}
