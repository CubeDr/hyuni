import Module, { DefaultModuleProps } from '../module';
import styles from './authored.module.css';

export default function AuthoredModule({ className }: DefaultModuleProps) {
    return (
        <Module
            title='Authored'
            className={className + ' ' + styles.AuthoredModule}
            link='https://www.yes24.com/Product/Goods/117372853'>
            <div className={styles.Body}>
                <img className={styles.Image}
                    src='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/book-compressed.jpg?alt=media&token=1642a989-701d-48a8-b2be-d1dc2f260fb9' />
                <div className={styles.DetailBlock}>
                    <div className={styles.BookTitle}>
                        취업과 이직을 위한 프로그래머스 코딩 테스트 문제 풀이 전략 : 자바 편
                    </div>
                    <div className={styles.BookSubtitle}>
                        핵심 개념, 79개 문제 풀이, 코딩전문역량인증시험(PCCP) 대비까지!
                    </div>
                    <div className={styles.BookSubtitle}>
                        합격에 한 걸음 더 가까워지는 실전형 코딩 테스트 문제 풀이 가이드
                    </div>
                    <div className={styles.BookBottom}>
                        ★ 9.8 · Check it out in YES24!
                    </div>
                </div>
            </div>
        </Module>
    );
}