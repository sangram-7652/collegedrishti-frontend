// src/components/Seo.jsx

import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { seoMeta, SITE_URL } from '../data/seoMeta'
/**
 * Create a case-insensitive lookup once.
 *
 * Structure:
 *
 * lookup = {
 *   course: {
 *     "online-mca": {
 *       slug: "online-mca",
 *       title: "...",
 *       description: "..."
 *     }
 *   },
 *
 *   specialization: {
 *     "mba-in-finance": {
 *       slug: "mba-in-finance",
 *       title: "...",
 *       description: "..."
 *     }
 *   }
 * }
 */
const lookup = {}

for (const type of Object.keys(seoMeta || {})) {
  lookup[type] = {}

  for (const slug of Object.keys(seoMeta[type] || {})) {
    lookup[type][slug.toLowerCase()] = {
      slug,
      ...seoMeta[type][slug]
    }
  }
}

/**
 * Get SEO metadata using the URL slug.
 */
function getSeoMeta (type, rawSlug) {
  let slug = rawSlug || ''

  try {
    slug = decodeURIComponent(slug)
  } catch {
    // Keep original slug if decoding fails
  }

  return lookup[type]?.[slug.toLowerCase()] || null
}

/**
 * SEO Component
 *
 * Course URL:
 * /course/online-mca
 *
 * Use:
 * <SEO type="course" />
 *
 *
 * Specialization URL:
 * /specialization/mba-in-finance
 *
 * Use:
 * <SEO type="specialization" />
 */
export default function SEO ({
  type,
  title: pageTitle,
  description: pageDescription,
  keywords,
  canonical: pageCanonical,
  fallbackTitle = 'College Drishti',
  fallbackDescription = '',
  image
}) {
  const { slug } = useParams()

  /**
   * Only allow supported SEO types.
   */
  const isDynamicPage = Boolean(pageTitle || pageDescription || pageCanonical)

  if (!isDynamicPage && type !== 'course' && type !== 'specialization') {
    return null
  }

  /**
   * Find metadata based on:
   *
   * type + URL slug
   */
  const entry = getSeoMeta(type, slug) || {}

  /**
   * Build canonical URL.
   *
   * Example:
   * https://collegedrishti.com/course/online-mca
   *
   * OR:
   *
   * https://collegedrishti.com/specialization/mba-in-finance
   */
  const url = pageCanonical || entry.canonical || (type
    ? `${SITE_URL}/${type}/${entry.slug || encodeURIComponent(slug || '')}`
    : undefined)

  /**
   * Use fallback values if a particular
   * metadata field is missing.
   */
  const title = pageTitle || entry.title || fallbackTitle

  const description = pageDescription || entry.description || fallbackDescription

  const seoImage = entry.image || image

  return (
    <Helmet>
      {/* =========================
          BASIC SEO
      ========================= */}

      <title>{title}</title>

      {description && <meta name='description' content={description} />}

      {keywords && <meta name='keywords' content={keywords} />}

      <link rel='canonical' href={url} />

      {/* =========================
          OPEN GRAPH
      ========================= */}

      <meta property='og:type' content={type === 'blog' ? 'article' : 'website'} />

      <meta property='og:site_name' content='College Drishti' />

      <meta property='og:title' content={title} />

      {description && <meta property='og:description' content={description} />}

      {url && <meta property='og:url' content={url} />}

      {/* Optional image */}
      {seoImage && <meta property='og:image' content={seoImage} />}
      {seoImage && <meta property='og:image:alt' content={title} />}

      {/* =========================
          TWITTER / X
      ========================= */}

      <meta name='twitter:card' content='summary_large_image' />

      <meta name='twitter:title' content={title} />

      {description && <meta name='twitter:description' content={description} />}

      {seoImage && <meta name='twitter:image' content={seoImage} />}
    </Helmet>
  )
}
