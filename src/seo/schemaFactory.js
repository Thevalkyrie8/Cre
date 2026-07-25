const PLACEHOLDER_PATTERN = /\{\{[^}]+\}\}/;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const toAbsoluteUrl = (value, siteUrl) => {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (ABSOLUTE_URL_PATTERN.test(raw)) return raw;
  return `${siteUrl}${raw.startsWith('/') ? raw : `/${raw}`}`;
};

export const toIsoDuration = (seconds) => {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  if (!total) return '';
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;
  return `PT${hours ? `${hours}H` : ''}${minutes ? `${minutes}M` : ''}${remainingSeconds || (!hours && !minutes) ? `${remainingSeconds}S` : ''}`;
};

export const removeEmptySchemaValues = (value) => {
  if (Array.isArray(value)) {
    return value
      .map(removeEmptySchemaValues)
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, removeEmptySchemaValues(item)])
      .filter(([, item]) => item !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }

  if (value === null || value === undefined || value === '') return undefined;
  return value;
};

const normalizePrice = (value) => {
  if (value === null || value === undefined || value === '') return undefined;
  const number = Number(String(value).replaceAll(',', ''));
  return Number.isFinite(number) && number > 0 ? number.toFixed(2) : undefined;
};

const normalizeAvailability = (value) => {
  if (value === false || value === 'inactive' || value === 'out-of-stock') {
    return 'https://schema.org/OutOfStock';
  }
  return 'https://schema.org/InStock';
};

export const buildOfferCatalog = ({ name, packages = [], canonical, language = 'vi' }) => {
  const activePackages = packages.filter((item) => item && item.isActive !== false);
  const itemListElement = activePackages.map((item) => {
    const packageName = language.startsWith('vi')
      ? (item.nameVi || item.name)
      : (item.name || item.nameVi);
    const description = language.startsWith('vi')
      ? (item.descriptionVi || item.description)
      : (item.description || item.descriptionVi);
    const price = item.priceType === 'custom' ? undefined : normalizePrice(item.price);

    return removeEmptySchemaValues({
      '@type': 'Offer',
      '@id': item.id ? `${canonical}#offer-${item.id}` : undefined,
      name: packageName,
      description,
      url: canonical,
      availability: normalizeAvailability(item.isActive),
      price,
      priceCurrency: price ? (item.priceCurrency || item.currency || 'VND') : undefined,
      itemOffered: {
        '@type': 'Service',
        name: packageName,
      },
    });
  });

  if (!itemListElement.length) return undefined;
  return {
    '@type': 'OfferCatalog',
    name,
    itemListElement,
  };
};

export const normalizeCmsService = ({
  service,
  pathname,
  canonical,
  language = 'vi',
}) => {
  const isVietnamese = language.startsWith('vi');
  const name = isVietnamese
    ? (service?.nameVi || service?.name)
    : (service?.name || service?.nameVi);
  const description = isVietnamese
    ? (service?.descriptionVi || service?.description)
    : (service?.description || service?.descriptionVi);
  const features = isVietnamese
    ? (service?.featuresVi || service?.features)
    : (service?.features || service?.featuresVi);

  return removeEmptySchemaValues({
    path: pathname,
    canonical,
    title: name ? `${name} | Unitrux` : undefined,
    heading: name,
    description,
    summary: description,
    type: 'Service',
    serviceName: name,
    noindex: service?.isActive === false,
    datePublished: service?.createdAt,
    dateModified: service?.updatedAt,
    schema: {
      serviceType: name,
      categories: [service?.category, ...(Array.isArray(features) ? features : [])],
      packages: service?.packages,
      audienceType: service?.audienceType || 'Doanh nghiệp',
      areaServed: service?.areaServed || ['Việt Nam'],
    },
  });
};

export const buildServiceNode = ({
  page,
  canonical,
  providerId,
  language = 'vi-VN',
}) => {
  const schema = page.schema || {};
  const catalog = buildOfferCatalog({
    name: schema.offerCatalogName || `Gói ${page.serviceName}`,
    packages: schema.packages || [],
    canonical,
    language,
  });

  const staticCatalog = Array.isArray(schema.offerCatalog)
    ? {
        '@type': 'OfferCatalog',
        name: schema.offerCatalogName || `Hạng mục ${page.serviceName}`,
        itemListElement: schema.offerCatalog.map((item, index) => ({
          '@type': 'Offer',
          '@id': `${canonical}#offer-${index + 1}`,
          itemOffered: {
            '@type': 'Service',
            name: item.name || item,
            description: item.description,
          },
        })),
      }
    : undefined;

  return removeEmptySchemaValues({
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: page.serviceName,
    description: page.description,
    url: canonical,
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
    provider: { '@id': providerId },
    serviceType: schema.serviceType || page.serviceName,
    category: schema.categories,
    areaServed: schema.areaServed || ['Việt Nam'],
    audience: schema.audienceType
      ? {
          '@type': 'BusinessAudience',
          audienceType: schema.audienceType,
        }
      : undefined,
    availableChannel: schema.availableChannel,
    hasOfferCatalog: catalog || staticCatalog,
  });
};

export const buildPortfolioNodes = ({
  portfolio,
  canonical,
  siteUrl,
  organizationId,
}) => {
  if (!portfolio?.items?.length) return [];

  const completeItems = portfolio.items.filter((item) => (
    item?.id
    && (item.titleVi || item.title)
    && item.thumbnail
    && item.uploadDate
    && item.src
  ));

  if (!completeItems.length) return [];

  const portfolioId = `${canonical}#portfolio`;
  const videoNodes = completeItems.map((item) => {
    const videoId = `${canonical}#video-${item.id}`;
    return removeEmptySchemaValues({
      '@type': 'VideoObject',
      '@id': videoId,
      name: item.titleVi || item.title,
      alternateName: item.title,
      description: item.descriptionVi || item.description,
      thumbnailUrl: [toAbsoluteUrl(item.thumbnail, siteUrl)],
      uploadDate: item.uploadDate,
      duration: toIsoDuration(item.durationSeconds),
      contentUrl: toAbsoluteUrl(item.src, siteUrl),
      encodingFormat: item.mimeType || 'video/mp4',
      width: item.width,
      height: item.height,
      inLanguage: portfolio.language || 'vi-VN',
      keywords: item.keywords,
      productionCompany: { '@id': organizationId },
      creator: { '@id': organizationId },
      copyrightHolder: { '@id': organizationId },
      isPartOf: { '@id': portfolioId },
      mainEntityOfPage: item.featured ? { '@id': `${canonical}#webpage` } : undefined,
    });
  });

  const imageNodes = completeItems.map((item) => removeEmptySchemaValues({
    '@type': 'ImageObject',
    '@id': `${canonical}#thumbnail-${item.id}`,
    name: `${item.titleVi || item.title} – thumbnail`,
    caption: item.descriptionVi || item.description,
    url: toAbsoluteUrl(item.thumbnail, siteUrl),
    contentUrl: toAbsoluteUrl(item.thumbnail, siteUrl),
    width: item.width,
    height: item.height,
    creator: { '@id': organizationId },
    creditText: 'Unitrux',
    copyrightNotice: `© ${new Date(item.uploadDate).getFullYear()} Unitrux`,
  }));

  const portfolioNode = removeEmptySchemaValues({
    '@type': 'CreativeWork',
    '@id': portfolioId,
    name: portfolio.nameVi || portfolio.name,
    alternateName: portfolio.name,
    description: portfolio.descriptionVi || portfolio.description,
    url: canonical,
    inLanguage: portfolio.language || 'vi-VN',
    creator: { '@id': organizationId },
    copyrightHolder: { '@id': organizationId },
    hasPart: completeItems.map((item) => ({ '@id': `${canonical}#video-${item.id}` })),
  });

  const itemListNode = {
    '@type': 'ItemList',
    '@id': `${canonical}#portfolio-list`,
    name: portfolio.nameVi || portfolio.name,
    numberOfItems: completeItems.length,
    itemListElement: completeItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@id': `${canonical}#video-${item.id}` },
    })),
  };

  return [portfolioNode, itemListNode, ...videoNodes, ...imageNodes];
};

const inspectValues = (value, path = '$', errors = []) => {
  if (typeof value === 'string') {
    if (PLACEHOLDER_PATTERN.test(value)) errors.push(`${path}: unresolved CMS placeholder`);
    if (value.includes('localhost') || value.includes('127.0.0.1')) {
      errors.push(`${path}: local URL cannot ship to production`);
    }
    return errors;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectValues(item, `${path}[${index}]`, errors));
    return errors;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => inspectValues(item, `${path}.${key}`, errors));
  }
  return errors;
};

export const validateStructuredData = (data) => {
  const errors = inspectValues(data);
  const graph = Array.isArray(data?.['@graph']) ? data['@graph'] : [];
  const ids = new Set();

  graph.forEach((node, index) => {
    if (node?.['@id']) {
      if (ids.has(node['@id'])) errors.push(`$['@graph'][${index}].@id: duplicate ${node['@id']}`);
      ids.add(node['@id']);
    }

    const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']];
    if (types.includes('VideoObject')) {
      ['name', 'thumbnailUrl', 'uploadDate'].forEach((field) => {
        if (!node[field] || (Array.isArray(node[field]) && !node[field].length)) {
          errors.push(`$['@graph'][${index}].${field}: required for VideoObject`);
        }
      });
      if (!node.contentUrl && !node.embedUrl) {
        errors.push(`$['@graph'][${index}]: VideoObject needs contentUrl or embedUrl`);
      }
    }

    if (types.includes('Service') && !node.provider) {
      errors.push(`$['@graph'][${index}].provider: required by project schema contract`);
    }
  });

  return errors;
};

export const assertStructuredData = (data, label = 'structured data') => {
  const errors = validateStructuredData(data);
  if (errors.length) {
    throw new Error(`${label} failed validation:\n- ${errors.join('\n- ')}`);
  }
  return data;
};
