import Head from 'next/head';

export default function SEO({
  description = 'Quality Cookware',
  author = 'Lifesmile',
  meta,
  title = 'Lifesmile',
  locale = 'en',
}) {
  const metaData = [
    {
      name: `og:locale`,
      content: locale,
    },
    {
      name: `og:type`,
      content: `website`,
    },
    {
      name: `og:title`,
      content: title,
    },
    {
      name: `og:description`,
      content: description,
    },
    {
      name: `og:url`,
      content: `https://www.lifesmile.ae/`,
    },
    {
      name: `og:site_name`,
      content: `Lifesmile`,
    },
  ].concat(meta);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <link rel="canonical" href="https://www.lifesmile.ae/" />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} property={name} content={content} />
      ))}
      <meta name="twitter:card" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description}></meta>
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
