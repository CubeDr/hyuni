import urlMetadata from 'url-metadata';
import OpenGraphBlock, { OgObject } from './OpenGraphBlock';

interface Props {
  url: string;
}

const cache = new Map<string, OgObject>();

async function fetchOgData(url: string): Promise<OgObject | null> {
  if (cache.has(url)) {
    return cache.get(url)!;
  }

  try {
    const result: urlMetadata.Result = await urlMetadata(url, {
      cache: 'force-cache',
    })

    const ogData: OgObject = {
      ogTitle: result['og:title'],
      ogUrl: result['og:url'],
      ogImage: result['og:image'] || result['image'],
      ogDescription: result['og:description'],
    }

    if (ogData.ogImage == null || ogData.ogImage === '' || ogData.ogTitle == null || ogData.ogTitle === '') {
      return null;
    }

    cache.set(url, ogData);
    return ogData;
  } catch (e) {
    return null;
  }
}

export default async function OpenGraphBlockServer({ url }: Props) {
  const ogData = await fetchOgData(url);

  return <OpenGraphBlock url={url} ogObject={ogData} />
}