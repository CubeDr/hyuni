import styles from './chip.module.css';

interface ChipProps {
    text: string;
}

export default function Chip({ text }: ChipProps) {
    return (
        <span className={styles.Chip}>{text}</span>
    );
}