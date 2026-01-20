import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  jsonLd?: object;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
}

const BASE_URL = "https://tokyo-innovation.lovable.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "Tokyo Innovation";

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
  article,
}: SEOProps) {
  const fullTitle = title.includes("Tokyo Innovation")
    ? title
    : `${title} | Tokyo Innovation`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;

  // Default Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    description:
      "Automação com IA em produção em poucos dias. Santa Rosa/RS e Noroeste Gaúcho.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santa Rosa",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -27.8708,
        longitude: -54.4811,
      },
      geoRadius: "150000",
    },
    sameAs: ["https://wa.me/555596030135"],
  };

  // WebSite JSON-LD for homepage
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Service JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Automação com Inteligência Artificial",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    areaServed: {
      "@type": "State",
      name: "Rio Grande do Sul",
    },
    description: description,
  };

  // Combine JSON-LD schemas
  const combinedJsonLd = jsonLd || {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd, websiteJsonLd, serviceJsonLd],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Article specific */}
      {article?.publishedTime && (
        <meta
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TokyoInnovation" />
      <meta name="twitter:creator" content="@TokyoInnovation" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Geo */}
      <meta name="geo.region" content="BR-RS" />
      <meta name="geo.placename" content="Santa Rosa" />
      <meta name="geo.position" content="-27.8708;-54.4811" />
      <meta name="ICBM" content="-27.8708, -54.4811" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(combinedJsonLd)}
      </script>
    </Helmet>
  );
}

// Pre-configured SEO for specific pages
export const pageSEO = {
  home: {
    title: "Tokyo Innovation | IA em produção em poucos dias",
    description:
      "Automação com IA funcionando + métrica antes/depois. Primeiro resultado em até 21 dias. Santa Rosa/RS e Noroeste Gaúcho.",
    canonical: "/",
  },
  dashboards: {
    title: "Dashboards com IA | Tokyo Innovation",
    description:
      "Transforme dados em decisão: dashboards com IA, previsões e alertas. Números do Negócio em linguagem simples.",
    canonical: "/solucoes/dashboards",
  },
  whatsapp: {
    title: "IA no WhatsApp | Tokyo Innovation",
    description:
      "WhatsApp organizado com IA: triagem, atendimento 24/7, follow-up e conversão. Resultado mensurável.",
    canonical: "/solucoes/whatsapp",
  },
  operations: {
    title: "Automação de Processos | Tokyo Innovation",
    description:
      "Reduza retrabalho e rotina manual. Automação com IA, integrações e método para resultado mensurável.",
    canonical: "/solucoes/operacao",
  },
  nichos: {
    title: "Nichos | Tokyo Innovation",
    description:
      "Seu nicho tem processos repetitivos? Então tem IA. Exemplos por setor com ganhos claros.",
    canonical: "/nichos",
  },
  notFound: {
    title: "Página não encontrada | Tokyo Innovation",
    description: "A página que você procura não existe ou foi movida.",
    noIndex: true,
  },
};
