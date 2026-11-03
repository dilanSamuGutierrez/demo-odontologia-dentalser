import Inicio from "@/components/Inicio";

// Datos estructurados: así Google entiende que es un consultorio con dos sedes
const esquema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dental Ser SAS",
  slogan: "Tu salud oral es nuestro compromiso",
  url: "https://dentalser.com",
  telephone: "+57 601 744 8349",
  email: "gestionalusuario@dentalser.com",
  areaServed: "Bogotá",
  medicalSpecialty: ["Dentistry"],
  department: [
    {
      "@type": "Dentist",
      name: "Dental Ser · Sede Puente Aranda",
      address: { "@type": "PostalAddress", streetAddress: "Calle 11 #60-30", addressLocality: "Bogotá", addressRegion: "Bogotá D.C.", addressCountry: "CO" },
      telephone: "+57 601 744 8349",
    },
    {
      "@type": "Dentist",
      name: "Dental Ser · Sede Engativá",
      address: { "@type": "PostalAddress", streetAddress: "Centro Comercial Nuestro, tercer piso, local 215", addressLocality: "Bogotá", addressRegion: "Bogotá D.C.", addressCountry: "CO" },
      telephone: "+57 601 744 8349",
    },
  ],
};

export default function Pagina() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(esquema) }} />
      <Inicio />
    </>
  );
}
