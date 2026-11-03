"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Deslizar } from "./Movimiento";

// Texto que rueda al hover
export function TextoRoll({ texto }: { texto: string }) {
  return (
    <span className="group/roll inline-grid h-[1.2em] overflow-hidden leading-[1.2]" aria-label={texto}>
      <span aria-hidden className="[grid-area:1/1] transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:-translate-y-full">{texto}</span>
      <span aria-hidden className="[grid-area:1/1] translate-y-full transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] group-hover:translate-y-0">{texto}</span>
    </span>
  );
}

// Botón píldora con interruptor (círculo + punto)
export function BotonPildora({ href, texto, variante = "oscuro", className }: { href: string; texto: string; variante?: "oscuro" | "claro"; className?: string }) {
  const oscuro = variante === "oscuro";
  const externo = href.startsWith("http");
  return (
    <Link href={href} {...(externo ? { target: "_blank", rel: "noopener" } : {})}
      className={`group inline-flex items-center justify-between gap-4 rounded-full py-1.5 pl-5 pr-1.5 text-[13px] font-semibold uppercase tracking-[.08em] shadow-[inset_0_-3px_0_rgb(0_0_0/.25)] ${oscuro ? "bg-tinta text-papel" : "bg-acento-2 text-tinta"} ${className ?? ""}`}>
      <TextoRoll texto={texto} />
      <span className={`flex h-[34px] w-[58px] items-center justify-between rounded-full p-[3px] pr-2.5 ${oscuro ? "bg-acento-2" : "bg-tinta"}`}>
        <i className={`grid size-7 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-3.5 ${oscuro ? "bg-tinta text-acento-2" : "bg-acento-2 text-tinta"}`}><ArrowRight size={14} /></i>
        <b className={`size-1.5 rounded-full transition-opacity group-hover:opacity-0 ${oscuro ? "bg-tinta" : "bg-acento-2"}`} />
      </span>
    </Link>
  );
}

export function Chip({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <span className={`inline-flex w-max items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[.06em] before:size-1.5 before:rounded-full before:bg-current ${claro ? "bg-white/20 text-white" : "bg-acento/10 text-acento"}`}>{children}</span>
  );
}

// Nav en píldora transparente sobre el hero que se vuelve sólida al bajar
export function NavPildora({ marca, enlaces, cta }: { marca: React.ReactNode; enlaces: { texto: string; href: string }[]; cta: { texto: string; href: string } }) {
  const [solida, setSolida] = useState(false);
  useEffect(() => {
    const revisar = () => setSolida(scrollY > innerHeight * 0.85);
    revisar(); addEventListener("scroll", revisar, { passive: true });
    return () => removeEventListener("scroll", revisar);
  }, []);
  return (
    <header className={`fixed left-1/2 top-3.5 z-40 flex w-[min(1120px,calc(100%-24px))] -translate-x-1/2 items-center justify-between gap-5 rounded-full py-2 pl-6 pr-2 transition-all duration-500 ${solida ? "bg-papel text-tinta shadow-[0_10px_30px_-18px_rgb(0_0_0/.35)]" : "text-white"}`}>
      <Link href="/" className="text-2xl font-extrabold tracking-[-.06em]">{marca}</Link>
      <nav className="hidden gap-7 text-[15px] font-medium md:flex">
        {enlaces.map((e) => <Link key={e.href} href={e.href} className="group"><TextoRoll texto={e.texto} /></Link>)}
      </nav>
      <BotonPildora href={cta.href} texto={cta.texto} variante="claro" />
    </header>
  );
}

// Título con palabra gigante gris detrás que se desliza
export function TituloConMarca({ marca, children, className }: { marca: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative isolate ${className ?? ""}`}>
      <Deslizar className="marca-agua pointer-events-none absolute left-1/2 top-[-.2em] -z-10 -translate-x-1/2 whitespace-nowrap text-[clamp(80px,15vw,240px)] font-bold leading-[.8] tracking-[-.05em]">{marca}</Deslizar>
      {children}
    </div>
  );
}
