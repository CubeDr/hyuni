'use client'

import {MouseEvent, useState} from 'react';
import styles from './projects.module.css';

interface NavigatorProps {
  projects: string[];
  selectedProject: string;
  onClick: (project: string) => void;
}

export default function Navigator({projects, selectedProject, onClick}: NavigatorProps) {
  const [indicatorTop, setIndicatorTop] = useState(projects.indexOf(selectedProject));

  function onProjectNameHover(e: MouseEvent) {
    const target = e.target as HTMLElement;
    setIndicatorTop(target.offsetTop);
  }

  function onProjectNameLeave() {
    const target = document.getElementById('project-' + selectedProject) as HTMLElement;
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
              onMouseEnter={onProjectNameHover}
              onMouseLeave={onProjectNameLeave}
              onClick={() => onClick(project)}>
              {project}
            </li>
          );
        })}
      </ul>
    </div>
  );
}