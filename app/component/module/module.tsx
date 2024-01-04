import styles from './module.module.css';

interface ModuleProps {
    title: string;
    className?: string;
    link?: string;
    children: React.ReactNode;
}

export interface DefaultModuleProps {
    className?: string;
}

export default function Module({ title, className = '', link, children }: ModuleProps) {
    if (link != null) {
        return (<a className={styles.LinkModule + ' ' + className} href={link} target='_blank'>
            <div className={styles.Title}>
                <span>{title}</span>
                <b>〉</b>
            </div>
            {children}
        </a>);
    }

    return (
        <div className={styles.Module + ' ' + className}>
            <div className={styles.Title}>{title}</div>
            {children}
        </div>
    );
}