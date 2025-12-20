import { APP_NAME, APP_DESCRIPTION } from './constants';

export const SEO = {
  defaultTitle: APP_NAME,
  titleTemplate: `%s | ${APP_NAME}`,
  description: APP_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: APP_NAME,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export const getPageTitle = (title?: string): string => {
  if (!title) return SEO.defaultTitle;
  return SEO.titleTemplate.replace('%s', title);
};

export const getMetadata = (options: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) => {
  return {
    title: options.title || SEO.defaultTitle,
    description: options.description || SEO.description,
    openGraph: {
      ...SEO.openGraph,
      title: options.title || SEO.defaultTitle,
      description: options.description || SEO.description,
      images: options.image ? [{ url: options.image }] : [],
      url: options.url,
    },
  };
};

