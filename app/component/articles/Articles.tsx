import styles from './Articles.module.css';
import Article from "@/app/component/articles/Article";

export default function Articles() {
  return (
    <div className={styles.Row}>
      <Article
        title="2024년 개발자 회고: 무엇을 배우고 성장했을까?"
        date='2024-12-27'
        imageUrl='https://yozm.wishket.com/media/news/2907/twtw.jpg'
        link='https://yozm.wishket.com/magazine/detail/2907/'
        source='요즘 IT' />
      <Article
        title="개발자를 위한 실전 '코딩 테스트' 준비 팁"
        date='2024-09-10'
        imageUrl='https://yozm.wishket.com/media/news/2755/21513.jpg'
        link='https://yozm.wishket.com/magazine/detail/2755/'
        source='요즘 IT' />
      <Article
        title="개발자의 논리적 사고와 문제 해결 'Set 구현 과정' 따라가기"
        date='2024-08-20'
        imageUrl='https://yozm.wishket.com/media/news/2723/5169.jpg'
        link='https://yozm.wishket.com/magazine/detail/2723/'
        source='요즘 IT' />
      <Article
        title='자바 가독성 높이는 5가지 팁'
        date='2024-07-22'
        imageUrl='https://yozm.wishket.com/media/news/2682/tracy-adams-TEemXOpR3cQ-unsplash.jpg'
        link='https://yozm.wishket.com/magazine/detail/2682/'
        source='요즘 IT' />
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
  );
}