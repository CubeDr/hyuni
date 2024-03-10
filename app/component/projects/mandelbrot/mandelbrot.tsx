import Chip from '../../chip/chip';
import styles from './mandelbrot.module.css';
import Image from 'next/image';

export default function Mandelbrot() {
  return (
    <div className={styles.Mandelbrot}>
      <div className={styles.Header}>
        <a className={styles.Link}
           href='https://github.com/CubeDr/fractals'>https://github.com/CubeDr/fractals</a>
        <div className={styles.Stacks}>
          <Chip text='Javascript' fontSize={12}/>
        </div>
      </div>
      <p className={styles.Summary}>
        Explore mandelbrot fractals on Web.
      </p>
      <div className={styles.Body}>
        <Image
          src={'https://github.com/CubeDr/fractals/assets/13654700/35bca700-ece5-44ec-9e80-8977fbc87935'}
          className={styles.Image}
          alt='Mandelbrot explorer'
          width={333}
          height={222}/>
        <div className={styles.Content}>
          <div className={styles.Description}>
            With Mandelbrot explorer, you can explore a stunning Mandelbrot pattern which is one of the most famous
            fractals in the world.
            <br/>
            <br/>
            This project aimed at providing a fast and interactive experience as well as well-designed codes.
          </div>
          <div className={styles.Footer}>
            <a
              href='https://cubedr.github.io/fractals/'
              target='_blank'>
              Try it out →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}