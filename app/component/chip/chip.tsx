import styles from './chip.module.css';

interface ChipProps {
    text: string;
    fontSize?: number;
}

export default function Chip({ text, fontSize }: ChipProps) {
    const finalFontSize = fontSize ?? 14;
    const paddingVertical = finalFontSize * 4 / 7;  // 8px for 14px font
    const paddingHorizontal = finalFontSize * 6 / 7;  // 12px for 14px font

    return (
        <span className={styles.Chip} style={{
            fontSize: fontSize ?? 14,
            padding: `${paddingVertical}px ${paddingHorizontal}px`,
        }}>{text}</span>
    );
}