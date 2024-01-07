'use client'

import { MouseEvent, useState } from 'react';
import styles from './projects.module.css';

interface NavigatorProps {
    projects: string[],
}

export default function Navigator({ projects }: NavigatorProps) {
    const [indicatorTop, setIndicatorTop] = useState(0);

    function onProjectNameHover(e: MouseEvent) {
        const target = e.target as HTMLElement;
        setIndicatorTop(target.offsetTop);
    }

    return (
        <div className={styles.Navigator}>
            <div className={styles.Indicator}
                style={{
                    top: indicatorTop,
                }}></div>
            <ul className={styles.ProjectList}>
                {projects.map(project => {
                    return (
                        <li
                            id={'project-' + project}
                            key={'project-' + project}
                            className={styles.ProjectName}
                            onMouseEnter={onProjectNameHover}>
                            {project}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}