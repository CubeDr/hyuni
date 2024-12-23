import styles from './OpenGraphBlock.module.css';
import urlMetadata from 'url-metadata';

interface OgObject {
  ogTitle: string;
  ogUrl: string;
  ogImage: string;
  ogDescription: string;
}

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

export default async function OpenGraphBlock({ url }: Props) {
  const ogData = await fetchOgData(url);

  return (
    <>
      {ogData && (
        <a className={styles.OpenGraphBlock} href={ogData.ogUrl}>
          {ogData.ogImage &&
            <img src={ogData.ogImage} alt={ogData.ogTitle} className={styles.Image} />
          }
          <div className={styles.Content}>
            <h2 className={styles.Title}>{ogData.ogTitle}</h2>
            <div className={styles.DescriptionContainer}>
              <span className={styles.Description}>{ogData.ogDescription}</span>
            </div>
            <span className={styles.Description}>{ogData.ogUrl}</span>
          </div>
        </a>
      )
      }
      {
        !ogData && (
          <a href={url} className={styles.Anchor}>{url}</a>
        )
      }
    </>
  );
}