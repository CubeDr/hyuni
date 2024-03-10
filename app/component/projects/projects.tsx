'use client'

import styles from './projects.module.css';
import Navigator from './navigator';
import JBTimer from './jbtimer/jbtimer';
import {useCallback, useState} from 'react';

const PROJECTS = [
  'JBTimer',
  'Mandelbrot',
  // 'Hyminton',
  // 'AutoMatch',
  // 'DotPlace',
  // 'AutoTrade',
  // 'DeveloperDungeon',
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  return (
    <section className={styles.Projects}>
      <div className={styles.ProjectsControl}>
        <h1>Projects</h1>
        <Navigator projects={PROJECTS} selectedProject={selectedProject} onClick={setSelectedProject}/>
      </div>
      <div className={styles.ProjectDetailContainer}>
        <div className={styles.ProjectDetail}>
          <div className={styles.ProjectDetailFrame}>
            <div className={styles.ProjectDetailFrameUpperLeftCorder}></div>
            <div className={styles.ProjectDetailFrameLowerRightCorder}></div>
            <JBTimer/>
          </div>
        </div>
      </div>
    </section>
  );
}