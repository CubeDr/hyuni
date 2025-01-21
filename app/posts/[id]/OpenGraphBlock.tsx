import styles from './OpenGraphBlock.module.css';

export interface OgObject {
  ogTitle: string;
  ogUrl: string;
  ogImage: string;
  ogDescription: string;
}

interface Props {
  url: string;
  ogObject?: OgObject | null;
}

export default function OpenGraphBlock({ url, ogObject }: Props) {
  return (
    <>
      {ogObject && (
        <a className={styles.OpenGraphBlock} href={ogObject.ogUrl}>
          {ogObject.ogImage &&
            <img src={ogObject.ogImage} alt={ogObject.ogTitle} className={styles.LeadingImage} />
          }
          <div className={styles.Content}>
            <div className={styles.Title}>
              {ogObject.ogImage &&
                <div className={styles.ThumbnailImageContainer}>
                  <img src={ogObject.ogImage} alt={ogObject.ogTitle} className={styles.ThumbnailImage} />
                </div>
              }
              {ogObject.ogTitle}
            </div>
            <div className={styles.DescriptionContainer}>
              <span className={styles.Description}>{ogObject.ogDescription}</span>
            </div>
            <span className={styles.Link}>{ogObject.ogUrl}</span>
          </div>
        </a>
      )
      }
      {
        !ogObject && (
          <a href={url} className={styles.Anchor}>{url}</a>
        )
      }
    </>
  );
}
