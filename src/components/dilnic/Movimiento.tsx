"use client";
import { useRef, useState, useLayoutEffect } from "react";
import { gsap, SplitText, useGSAP, reducido } from "@/lib/gsap";

// Titular que entra por líneas o palabras desde una máscara
export function Lineas({ as = "h2", tipo = "lines", alCargar = false, className, children }:
  { as?: React.ElementType; tipo?: "lines" | "words"; alCargar?: boolean; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;
  useGSAP(() => {
    if (reducido() || !ref.current) return;
    SplitText.create(ref.current, {
      type: tipo, mask: tipo, autoSplit: true,
      onSplit: (s) => gsap.from(tipo === "lines" ? s.lines : s.words, {
        yPercent: 110, duration: 1.1, ease: "power4.out", stagger: tipo === "lines" ? 0.09 : 0.04,
        delay: alCargar ? 0.2 : 0,
        scrollTrigger: alCargar ? undefined : { trigger: ref.current, start: "top 88%", once: true },
      }),
    });
  }, { scope: ref });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

// Aparece subiendo; con grupo anima a los hijos en cascada
export function Subir({ grupo = false, className, children }: { grupo?: boolean; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reducido() || !ref.current) return;
    gsap.from(grupo ? ref.current.children : ref.current, {
      y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: grupo ? 0.08 : 0,
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}

// Número que sube al entrar en pantalla
export function Contador({ valor, decimales = 0, prefijo = "", sufijo = "", className }:
  { valor: number; decimales?: number; prefijo?: string; sufijo?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const formato = (v: number) => prefijo + v.toLocaleString("es-CO", { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) + sufijo;
  useGSAP(() => {
    if (!ref.current) return;
    if (reducido()) { ref.current.textContent = formato(valor); return; }
    const o = { v: 0 };
    gsap.to(o, { v: valor, duration: 2, ease: "power2.out", onUpdate: () => { if (ref.current) ref.current.textContent = formato(o.v); },
      scrollTrigger: { trigger: ref.current, start: "top 90%", once: true } });
  });
  return <span ref={ref} className={`tabular-nums ${className ?? ""}`}>{formato(valor)}</span>;
}

// Capa que sube más rápido que el scroll (profundidad)
export function Flotar({ velocidad = 0.3, className, children }: { velocidad?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reducido()) return;
    gsap.to(ref.current, { y: () => -velocidad * innerHeight * 0.6, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
  });
  return <div ref={ref} className={className}>{children}</div>;
}

// Desplazamiento horizontal con el scroll (marcas de agua)
export function Deslizar({ distancia = -18, className, children }: { distancia?: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (reducido()) return;
    gsap.fromTo(ref.current, { xPercent: -distancia / 2 }, { xPercent: distancia / 2, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
  });
  return <span ref={ref} className={className}>{children}</span>;
}

// Franja infinita. Repite el contenido para cubrir el ancho
export function Marquee({ segundos = 40, reversa = false, pausar = false, className, children }:
  { segundos?: number; reversa?: boolean; pausar?: boolean; className?: string; children: React.ReactNode }) {
  const pista = useRef<HTMLDivElement>(null);
  const anim = useRef<gsap.core.Tween | null>(null);
  useGSAP(() => {
    if (reducido()) return;
    anim.current = gsap.fromTo(pista.current, { xPercent: reversa ? -50 : 0 }, { xPercent: reversa ? 0 : -50, duration: segundos, ease: "none", repeat: -1 });
  });
  const copia = <div className="flex shrink-0 items-center gap-[inherit] pr-[inherit]">{children}</div>;
  return (
    <div className={`flex overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => { if (pausar && anim.current) gsap.to(anim.current, { timeScale: 0, duration: 0.5 }); }}
      onMouseLeave={() => { if (pausar && anim.current) gsap.to(anim.current, { timeScale: 1, duration: 0.5 }); }}>
      <div ref={pista} className="flex w-max shrink-0 gap-[inherit]">
        {copia}{copia}<div aria-hidden className="contents">{copia}{copia}</div>
      </div>
    </div>
  );
}

// Palabra que llena exactamente el ancho de su contenedor
export function PalabraGigante({ texto, className }: { texto: string; className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const palabra = useRef<HTMLSpanElement>(null);
  const [tam, setTam] = useState(100);
  useLayoutEffect(() => {
    const medir = () => {
      if (!caja.current || !palabra.current) return;
      palabra.current.style.fontSize = "100px";
      setTam(Math.floor((100 * caja.current.clientWidth) / palabra.current.scrollWidth * 0.995));
    };
    medir();
    document.fonts?.ready.then(medir);
    const ro = new ResizeObserver(medir);
    if (caja.current) ro.observe(caja.current);
    return () => ro.disconnect();
  }, [texto]);
  return (
    <div ref={caja} className="w-full">
      <span ref={palabra} style={{ fontSize: tam }} className={`block w-max whitespace-nowrap leading-[.78] tracking-[-.05em] ${className ?? ""}`}>{texto}</span>
    </div>
  );
}
