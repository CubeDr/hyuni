'use client'

import styles from './projects.module.css';
import Navigator from './navigator';

const PROJECTS = [
    'JBTimer',
    'Hyminton',
    'AutoMatch',
    'DotPlace',
    'AutoTrade',
    'DeveloperDungeon',
];

export default function Projects() {
    return (
        <section className={styles.Projects}>
            <div className={styles.ProjectsControl}>
                <h1>Projects</h1>
                <Navigator projects={PROJECTS} />
            </div>
            <div className={styles.ProjectDetailContainer}>
                <div className={styles.ProjectDetail}>
                    <div className={styles.ProjectDetailFrame}>
                        <div className={styles.ProjectDetailFrameUpperLeftCorder}></div>
                        <div className={styles.ProjectDetailFrameLowerRightCorder}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}