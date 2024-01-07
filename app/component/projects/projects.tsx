import styles from './projects.module.css';

export default function Projects() {
    return (
        <section className={styles.Projects}>
            <div className={styles.Navigator}>
                <h1>Projects</h1>
                <ul className={styles.ProjectList}>
                    <li className={styles.ProjectName}>JBTimer</li>
                    <li className={styles.ProjectName}>Hyminton</li>
                    <li className={styles.ProjectName}>AutoMatch</li>
                    <li className={styles.ProjectName}>DotPlace</li>
                    <li className={styles.ProjectName}>AutoTrade</li>
                    <li className={styles.ProjectName}>DeveloperDungeon</li>
                </ul>
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