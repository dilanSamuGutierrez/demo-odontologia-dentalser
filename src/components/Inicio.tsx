"use client";
import { Baby, CalendarCheck, Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { Contador, Lineas, Marquee, Subir } from "@/components/dilnic/Movimiento";
import { BotonPildora, Chip, NavPildora, TituloConMarca } from "@/components/dilnic/Piezas";
import {
  Bento, Carrusel, Celda, Cifras, Constelacion, Dividido, HeroDesvanece, PieSobreFoto,
  Preguntas, SeSale, SubeEncima, TarjetaProducto, TarjetaVidrio,
} from "@/components/dilnic/Secciones";

const foto = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const WHATSAPP = "https://wa.me/573006036868?text=" + encodeURIComponent("Hola, quiero agendar una cita en Dental Ser.");
const TELEFONO = "tel:+576017448349";

const sedes = [
  {
    nombre: "Puente Aranda",
    direccion: "Calle 11 #60-30",
    detalle: "Bogotá, localidad de Puente Aranda",
    mapa: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Dental Ser Calle 11 60-30 Bogotá"),
  },
  {
    nombre: "Engativá",
    direccion: "Centro Comercial Nuestro",
    detalle: "Tercer piso, local 215",
    mapa: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Centro Comercial Nuestro Bogotá"),
  },
];

const servicios = [
  { nombre: "Odontología general", precio: "Toda la familia", etiqueta: "Primera cita", imagen: foto("1606811971618-4486d14f3f99", 900), alt: "Revisión dental con espejo e instrumento", detalle: "Diagnóstico inicial, tratamiento de caries y remisión al especialista cuando lo necesitas." },
  { nombre: "Odontopediatría", precio: "Niños y jóvenes", imagen: foto("1758205307836-0829c799890b", 900), alt: "Odontólogo revisando los dientes de un niño", detalle: "Prevención y tratamiento desde la infancia hasta la adolescencia, incluidos golpes y alteraciones del esmalte." },
  { nombre: "Ortodoncia", precio: "Alineación", imagen: foto("1777446899714-c26de766dffd", 900), alt: "Modelo dental con brackets metálicos", detalle: "Corregimos la posición de los dientes y la mordida con brackets tradicionales y sistemas más modernos." },
  { nombre: "Implantología", precio: "Reponer piezas", imagen: foto("1771442873035-474765b40ac6", 900), alt: "Mano con guante sosteniendo un implante dental y su corona", detalle: "Implantes para recuperar un diente perdido de forma natural y duradera." },
  { nombre: "Estética dental", precio: "Sonrisa", imagen: foto("1677026010083-78ec7f1b84ed", 900), alt: "Primer plano de una sonrisa con dientes blancos", detalle: "Blanqueamientos, carillas de porcelana y tratamientos pensados para tu sonrisa." },
  { nombre: "Endodoncia", precio: "Salvar el diente", imagen: foto("1606811856475-5e6fcdc6e509", 900), alt: "Espejo dental y explorador metálico sobre una superficie blanca", detalle: "Tratamiento de conductos para conservar dientes que de otra forma habría que extraer." },
];

const preguntas = [
  { pregunta: "¿Cómo pido una cita?", respuesta: <>Escríbenos al WhatsApp <b className="text-tinta">300 603 6868</b>: la agenda es automática y eliges sede, día y hora. Si prefieres llamar, el número es <b className="text-tinta">601 744 8349</b>.</> },
  { pregunta: "¿Atienden niños?", respuesta: "Sí. Tenemos odontopediatría para niños y adolescentes: prevención, tratamiento de caries, golpes en los dientes y alteraciones del esmalte." },
  { pregunta: "¿En cuál sede me conviene atenderme?", respuesta: "En la que te quede más cerca: Puente Aranda (Calle 11 #60-30) o Engativá (Centro Comercial Nuestro, tercer piso, local 215). Al agendar por WhatsApp eliges la sede." },
  { pregunta: "Me falta un diente, ¿qué opciones tengo?", respuesta: "Empezamos con una valoración y, según tu caso, te explicamos si un implante es la mejor opción y cómo sería el proceso." },
  { pregunta: "¿Cuánto cuesta un tratamiento?", respuesta: "Depende de lo que encuentre el diagnóstico. Escríbenos por WhatsApp y te contamos cómo es la valoración y qué incluye." },
];

export default function Inicio() {
  return (
    <main>
      <NavPildora
        marca={<>dental ser<em className="font-serif font-normal text-acento-2">.</em></>}
        enlaces={[{ texto: "Servicios", href: "#servicios" }, { texto: "Sedes", href: "#sedes" }, { texto: "Preguntas", href: "#preguntas" }]}
        cta={{ texto: "Agendar", href: WHATSAPP }}
      />

      <div>
        <HeroDesvanece
          imagen={foto("1489278353717-f64c6ee8a4d2", 2000)}
          alt="Mujer de cabello negro sonriendo en primer plano"
          palabra="DENTAL SER"
          texto="Odontología para toda la familia en Puente Aranda y Engativá. Desde la primera revisión de tus hijos hasta un implante."
          enlace={{ texto: "Agendar cita por WhatsApp", href: WHATSAPP }}
          tarjetas={<>
            <TarjetaVidrio oscura><b className="text-lg">Agenda automática</b><span className="text-sm text-white/80">Escribe por WhatsApp y elige tu cita sin esperar a que contesten.</span></TarjetaVidrio>
            <TarjetaVidrio><b className="text-3xl tracking-[-.04em]">2 sedes</b><span className="text-sm text-white/85">Puente Aranda y Engativá</span></TarjetaVidrio>
          </>}
        />
        <SubeEncima id="nosotros">
          <div className="grid justify-items-center gap-6">
            <Chip>Tu salud oral es nuestro compromiso</Chip>
            <Lineas className="mezcla text-center text-[clamp(38px,6vw,92px)] font-semibold uppercase leading-[.95] tracking-[-.03em] [&_em]:text-acento">
              Una sonrisa <em>sana</em><br />empieza por un<br />diagnóstico claro
            </Lineas>
          </div>
          <Constelacion
            imagen={foto("1777331903190-341a3dd0441b", 1100)}
            alt="Odontólogo conversando con un paciente en un consultorio moderno"
            tarjetas={[
              { icono: Stethoscope, titulo: "Diagnóstico sin rodeos", texto: "Te explicamos qué tienes y qué opciones hay antes de empezar." },
              { icono: Baby, titulo: "Niños sin miedo", texto: "Odontopediatría desde la infancia hasta la adolescencia." },
              { icono: CalendarCheck, titulo: "Cita en minutos", texto: "Agenda automática por WhatsApp, sin llamadas ni filas." },
              { icono: MapPin, titulo: "Cerca de ti", texto: "Calle 11 en Puente Aranda y CC Nuestro en Engativá." },
            ]}
          />
          <Cifras items={[
            { valor: <Contador valor={6} />, texto: "especialidades en un mismo lugar" },
            { valor: <Contador valor={2} />, texto: "sedes en Bogotá" },
            { valor: <Contador valor={1} />, texto: "mensaje de WhatsApp para pedir tu cita" },
            { valor: <ShieldCheck className="inline size-[.8em] text-acento" strokeWidth={1.6} />, texto: "Vigilado por la Supersalud" },
          ]} />
        </SubeEncima>
      </div>

      <Dividido
        id="servicios"
        imagen={foto("1629909613654-28e377c37b09", 1400)}
        alt="Consultorio odontológico moderno con silla y equipos"
        nota={<>
          <span className="font-mono text-[11px] uppercase tracking-[.1em] text-white/70">Por dónde empezar</span>
          <b className="text-lg leading-tight">Un diagnóstico primero</b>
          <span className="text-sm text-white/85">Revisamos, tratamos lo urgente y te remitimos al especialista si hace falta.</span>
        </>}
      >
        <div className="grid gap-5">
          <Chip>Especialidades</Chip>
          <Lineas className="mezcla text-[clamp(36px,4.6vw,72px)] font-semibold leading-[.98] tracking-[-.035em] [&_em]:text-acento">
            Todo lo que tu boca<br />necesita, <em>en un solo lugar</em>
          </Lineas>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-suave">Sin ir de consultorio en consultorio: general, niños, ortodoncia, implantes, estética y conductos con el mismo equipo y la misma historia clínica.</p>
        </div>
        <Carrusel etiqueta="6 especialidades · desliza">
          {servicios.map((s) => <TarjetaProducto key={s.nombre} {...s} />)}
        </Carrusel>
        <BotonPildora href={WHATSAPP} texto="Preguntar por un tratamiento" className="w-max" />
      </Dividido>

      <section className="px-[max(20px,5vw)] py-[clamp(90px,10vw,140px)]">
        <TituloConMarca marca="Sonrisa" className="mb-14">
          <Lineas className="mezcla text-center text-[clamp(40px,6vw,88px)] font-semibold leading-none tracking-[-.04em] [&_em]:text-acento">Tu cita, <em>sin vueltas.</em></Lineas>
        </TituloConMarca>
        <Bento>
          <Celda span={7} estilo="acento" className="min-h-[420px]">
            <span className="font-mono text-xs uppercase tracking-[.1em] text-white/70">01 · WhatsApp</span>
            <h3 className="max-w-[16ch] text-[clamp(28px,3vw,44px)] font-semibold leading-[1.02] tracking-[-.03em]">Escribe y la cita se agenda sola</h3>
            <p className="max-w-[34ch] text-white/85">El WhatsApp de Dental Ser agenda de forma automática: eliges sede, día y hora sin esperar a que alguien conteste.</p>
            <BotonPildora href={WHATSAPP} texto="Abrir WhatsApp" variante="claro" className="relative z-10 mt-auto w-max" />
            <SeSale imagen={foto("1494790108377-be9c29b29330", 700)} alt="Mujer sonriendo en primer plano" />
          </Celda>
          <Celda span={5} estilo="oscura">
            <span className="font-mono text-xs uppercase tracking-[.1em] text-white/60">02 · Niños</span>
            <Baby className="text-acento-2" size={34} strokeWidth={1.5} />
            <h3 className="text-[clamp(24px,2.4vw,34px)] font-semibold leading-tight tracking-[-.02em]">La primera cita de tus hijos, tranquila</h3>
            <p className="text-white/75">Odontopediatría para prevenir desde pequeños y atender golpes, caries y alteraciones del esmalte.</p>
          </Celda>
          <Celda span={6}>
            <span className="font-mono text-xs uppercase tracking-[.1em] text-suave">03 · Estética</span>
            <h3 className="text-[clamp(24px,2.4vw,34px)] font-semibold leading-tight tracking-[-.02em]">Blanqueamiento y carillas de porcelana</h3>
            <p className="text-suave">Tratamientos personalizados según tu sonrisa, después de revisar que tus dientes estén sanos.</p>
          </Celda>
          <Celda span={6} className="justify-between">
            <span className="font-mono text-xs uppercase tracking-[.1em] text-suave">04 · Especialidades</span>
            <h3 className="text-[clamp(24px,2.4vw,34px)] font-semibold leading-tight tracking-[-.02em]">Un mismo equipo para cada etapa</h3>
            <Marquee segundos={28} className="bordes-suaves gap-2.5 pr-2.5">
              {servicios.map((s) => <span key={s.nombre} className="whitespace-nowrap rounded-full bg-acento-2/60 px-4 py-2 text-sm font-medium">{s.nombre}</span>)}
            </Marquee>
          </Celda>
        </Bento>
      </section>

      <section id="sedes" className="rounded-t-[32px] bg-tinta px-[max(20px,5vw)] py-[clamp(90px,10vw,140px)] text-white">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Lineas className="mezcla text-[clamp(40px,6vw,88px)] font-semibold leading-[.95] tracking-[-.04em] [&_em]:text-acento-2">Dos sedes,<br /><em>cerca de ti</em></Lineas>
          <p className="max-w-[34ch] text-white/70">Mismo equipo y mismos tratamientos en las dos. Elige la que te quede más fácil.</p>
        </div>
        <Subir grupo className="grid gap-4 md:grid-cols-2">
          {sedes.map((s, i) => (
            <article key={s.nombre} className="grid gap-8 rounded-[26px] border border-white/15 bg-white/[.04] p-[clamp(24px,3vw,40px)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[.1em] text-acento-2">Sede 0{i + 1}</span>
                  <h3 className="mt-2 text-[clamp(30px,3.4vw,48px)] font-semibold leading-none tracking-[-.035em]">{s.nombre}</h3>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-acento-2 text-tinta"><MapPin size={20} /></span>
              </div>
              <div className="grid gap-1 text-lg"><b className="font-medium">{s.direccion}</b><span className="text-white/65">{s.detalle}</span></div>
              <div className="flex flex-wrap gap-3">
                <BotonPildora href={WHATSAPP} texto="Agendar aquí" variante="claro" />
                <a href={s.mapa} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[.08em] transition hover:bg-white/10">Cómo llegar</a>
              </div>
            </article>
          ))}
        </Subir>
      </section>

      <section id="preguntas" className="bg-fondo px-[max(20px,5vw)] py-[clamp(90px,10vw,140px)]">
        <TituloConMarca marca="Preguntas" className="mb-14">
          <Lineas className="mezcla text-center text-[clamp(40px,6vw,88px)] font-semibold leading-none tracking-[-.04em] [&_em]:text-acento">Antes de <em>tu cita</em></Lineas>
        </TituloConMarca>
        <Preguntas items={preguntas} />
      </section>

      <PieSobreFoto imagen={foto("1762625570087-6d98fca29531", 2000)} marca="dental ser">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="grid content-start gap-5">
            <Lineas className="mezcla text-[clamp(32px,3.6vw,54px)] font-semibold leading-[.98] tracking-[-.035em] [&_em]:text-acento">Tu salud oral es<br /><em>nuestro compromiso</em></Lineas>
            <BotonPildora href={WHATSAPP} texto="Agendar por WhatsApp" className="w-max" />
          </div>
          <div className="grid content-start gap-3 text-[15px]">
            <span className="font-mono text-xs uppercase tracking-[.1em] text-suave">Contacto</span>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="flex items-center gap-2"><MessageCircle size={16} className="text-acento" />300 603 6868</a>
            <a href={TELEFONO} className="flex items-center gap-2"><Phone size={16} className="text-acento" />601 744 8349</a>
            <a href="mailto:gestionalusuario@dentalser.com" className="flex items-center gap-2 break-all"><Mail size={16} className="shrink-0 text-acento" />gestionalusuario@dentalser.com</a>
            <span className="flex items-center gap-2 text-suave"><Clock size={16} className="text-acento" />Agenda por WhatsApp</span>
          </div>
          <div className="grid content-start gap-3 text-[15px]">
            <span className="font-mono text-xs uppercase tracking-[.1em] text-suave">Sedes</span>
            {sedes.map((s) => <a key={s.nombre} href={s.mapa} target="_blank" rel="noopener"><b className="font-medium">{s.nombre}</b><span className="block text-suave">{s.direccion} · {s.detalle}</span></a>)}
            <span className="mt-2 flex items-center gap-2 text-suave"><ShieldCheck size={16} className="text-acento" />Vigilado por Supersalud</span>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-linea pt-6 text-xs text-suave">
          <span>© 2026 Dental Ser SAS · Bogotá, Colombia</span>
          <span>Propuesta de diseño: DilNic Studio · dilnic.com</span>
        </div>
      </PieSobreFoto>

      {/* Botón flotante de WhatsApp */}
      <a href={WHATSAPP} target="_blank" rel="noopener" aria-label="Agendar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-acento text-white shadow-[0_14px_30px_-10px_rgb(11_110_117/.7)] transition hover:scale-105">
        <MessageCircle size={24} />
      </a>

      {/* Aviso de demo: esta página es una propuesta, no el sitio oficial */}
      <div className="fixed bottom-5 left-5 z-40 max-w-[calc(100%-110px)] rounded-full bg-tinta/90 px-4 py-2 text-[11px] font-medium text-white backdrop-blur">
        Demo de propuesta · DilNic Studio · no es el sitio oficial
      </div>
    </main>
  );
}
