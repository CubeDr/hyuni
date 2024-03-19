import styles from './Articles.module.css';
import Article from "@/app/component/articles/Article";

export default function Articles() {
  return (
    <section className={styles.Articles}>
      <h1 className={styles.Title}>Articles</h1>
      <div className={styles.Row}>
        <Article
          title='개발자에게 "코드 스타일" 왜 중요할까?'
          date='2024-03-18'
          imageUrl='https://yozm.wishket.com/media/news/2499/code-style.jpg'
          link='https://yozm.wishket.com/magazine/detail/2499/'
          source='요즘 IT' />
        <Article
          title='5 Multithreading Options in Java'
          date='2023-07-19'
          imageUrl='https://miro.medium.com/v2/resize:fit:720/format:webp/1*E8aisoClHQRF_938e_Yg4g.jpeg'
          link='https://medium.com/@jbhyunikim/5-multithreading-options-in-java-54905c657b2b'
          source='Medium' />
        <Article
          title='How Do I Provide My Method? With “static” or Through Dependency Injection?'
          date='2023-07-06'
          imageUrl='https://miro.medium.com/v2/resize:fit:720/format:webp/0*vEP0k_D22Vcd9Ziv'
          link='https://medium.com/@jbhyunikim/unleashing-the-java-dependency-dilemma-static-classes-vs-dependency-injection-showdown-b2a053bc841'
          source='Medium' />
        <Article
          title='Can Streams Replace Loops in Java?'
          date='2023-06-29'
          imageUrl='https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzD1gNnK8D74R3JwlHfN3w.png'
          link='https://medium.com/better-programming/can-streams-replace-loops-in-java-f56d4461743a'
          source='Medium' />
      </div>
    </section>
  );
}