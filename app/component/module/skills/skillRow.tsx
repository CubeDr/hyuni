'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './skills.module.css';
import Chip from '../../chip/chip';

const FPS = 10;
const PX_PER_SEC = 30;
const PX_PER_FPS = PX_PER_SEC * FPS / 1000;

interface SkillRowProps {
    skills: string[];
    direction: 'forward' | 'reverse';
}

export default function SkillRow({ skills, direction }: SkillRowProps) {
    const leftContainerRef = useRef<HTMLDivElement>(null);
    const initialOffsetX = useRef(0);
    const [offsetX, setOffsetX] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const multiplier = direction === 'forward' ? 1 : -1;

        const interval = setInterval(() => {
            setOffsetX(offsetX => {
                const delta = PX_PER_FPS * multiplier;
                const newOffsetX = offsetX + delta;

                if (direction === 'forward') {
                    if (Math.abs(newOffsetX % containerWidth) < PX_PER_FPS / 2) {
                        return initialOffsetX.current + delta;
                    }
                } else {
                    if (Math.abs(newOffsetX + containerWidth) < PX_PER_FPS / 2) {
                        return initialOffsetX.current + delta;
                    }
                }

                return newOffsetX;
            });
        }, FPS);
        return () => clearInterval(interval);
    }, [skills, direction, containerWidth]);

    useLayoutEffect(() => {
        if (leftContainerRef.current == null) {
            return;
        }

        const containerWidth = leftContainerRef.current.offsetWidth;
        setContainerWidth(containerWidth);

        if (direction === 'forward') {
            initialOffsetX.current = -containerWidth;
        } else {
            initialOffsetX.current = 0;
        }
        setOffsetX(initialOffsetX.current);
    }, []);

    return (
        <div className={styles.SkillRow}>
            <div style={{
                transform: `translateX(${offsetX}px)`
            }} ref={leftContainerRef}>
                {
                    skills.map(skill => (
                        <Chip key={skill} text={skill} fontSize={12} />
                    ))
                }
            </div>
            <div style={{
                transform: `translateX(${offsetX}px)`
            }}>
                {
                    skills.map(skill => (
                        <Chip key={skill} text={skill} fontSize={12} />
                    ))
                }
            </div>
            <div className={styles.LeftWing} />
            <div className={styles.RightWing} />
        </div>
    );
}