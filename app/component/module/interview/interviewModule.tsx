import Module, { DefaultModuleProps } from '../module';
import InterviewItem from './interviewItem';
import yozmIt from '../../../../public/images/yozmit-compressed.jpg';
import wantedImage from '../../../../public/images/wanted-compressed.jpg';
import yes24Image from '../../../../public/images/yes24-compressed.jpg';
import newsHImage from '../../../../public/images/news-h-compressed.jpg';
import styles from './interviewItem.module.css';

export default function InterviewModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Interviews' className={className + ' ' + styles.InterviewModule}>
            <InterviewItem
                title='구글 4년차 엔지니어로 살아가기: 김현이 구글코리아 소프트웨어 엔지니어'
                attribution='요즘 IT'
                linkUrl='https://yozm.wishket.com/magazine/detail/2460/'
                imageSrc={yozmIt}
                date='2024-02-20'
            />
            <InterviewItem
                title='구글코리아ㅣ아직은 코딩이 낯선 이들을 위해'
                attribution='Wanted Lab'
                linkUrl='https://www.wanted.co.kr/events/article_23_05_10'
                imageSrc={wantedImage}
                date='2023-05-10'
            />
            <InterviewItem
                title="개발자 취업 위한 '코딩 테스트', 이렇게 준비하자"
                attribution='YES24'
                linkUrl='https://ch.yes24.com/Article/View/52782'
                imageSrc={yes24Image}
                date='2023-02-21'
            />
            <InterviewItem
                title='프로그래머들을 위한 코딩테스트와 기술 면접 저서를 출간한 김현이 동문을 만나다'
                attribution='News H'
                linkUrl='https://www.newshyu.com/news/articleView.html?idxno=1011411'
                imageSrc={newsHImage}
                date='2023-09-22'
            />
        </Module>
    );
}