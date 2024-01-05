import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import styles from './interviewItem.module.css';
import Image from 'next/image';

interface InterviewItemProps {
    title: string;
    attribution: string;
    date: string;
    imageSrc: string | StaticImport;
    linkUrl: string;
}

export default function InterviewItem({ title, attribution, linkUrl, imageSrc, date }: InterviewItemProps) {
    return (
        <a href={linkUrl} className={styles.InterviewItem} target='_blank'>
            <div className={styles.Content}>
                <div className={styles.Title}>{title}</div>
                <div className={styles.Footer}>{attribution} · {date}</div>
            </div>
            <Image
                src={imageSrc}
                alt={title}
                className={styles.Image} />
        </a>
    );
}