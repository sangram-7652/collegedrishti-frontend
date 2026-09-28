import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, canonical, type = 'website' }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name='description' content={description} />

      <meta name='robots' content='index, follow' />

      <link rel='canonical' href={canonical} />

      <meta property='og:title' content={title} />

      <meta property='og:description' content={description} />

      <meta property='og:url' content={canonical} />

      <meta property='og:type' content={type} />

      <meta property='og:site_name' content='CollegeDrishti' />

      <meta name='twitter:card' content='summary_large_image' />

      <meta name='twitter:title' content={title} />

      <meta name='twitter:description' content={description} />
    </Helmet>
  )
}

export default SEO
