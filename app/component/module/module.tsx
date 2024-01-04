import styles from './module.module.css';

interface ModuleProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export interface DefaultModuleProps {
    className?: string;
}

export default function Module({ title, className = '', children }: ModuleProps) {
    return (
        <div className={styles.Module + ' ' + className}>
            <div className={styles.Title}>{title}</div>
            {children}
        </div>
    );
}