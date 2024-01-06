import Module, { DefaultModuleProps } from '../module';
import styles from './cube.module.css';
import cubeImage from '../../../../public/images/cube-compressed.jpg';
import Image from 'next/image';

export default function CubeModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Rubiks Cube' className={className}>
            <div className={styles.Body}>
                <Image
                    className={styles.Image}
                    src={cubeImage}
                    alt='Cube'
                    width={90}
                    height={120} />
                <div className={styles.Content}>
                    3x3 Avg. 25s<br />
                    3x3 Best 14.257s<br /><br />
                    Also...
                    <span className={styles.Also}>
                        Pyraminx, Megaminx, 2x2x2, 4x4x4, 5x5x5, Square-1, Mastermorphix
                    </span>
                </div>
            </div>
        </Module>
    );
}