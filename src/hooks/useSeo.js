import { Helmet } from 'react-helmet';

/**
 * Hook simplificado para SEO básico
 */
export const useSeo = ({
  title = 'MiTienda - UNQuirGolas',
  description = 'Los mejores productos al mejor precio',
  keywords = 'tienda, ecommerce, productos, UNQuirGolas',
  image = '',
  noindex = false
} = {}) => {
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};