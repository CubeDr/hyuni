import Module, { DefaultModuleProps } from '../module';
import InterviewItem from './interviewItem';

export default function InterviewModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Interviews' className={className}>
            <InterviewItem
                title='구글코리아ㅣ아직은 코딩이 낯선 이들을 위해'
                attribution='Wanted Lab'
                linkUrl='https://www.wanted.co.kr/events/article_23_05_10'
                imageUrl='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/wanted-compressed.jpg?alt=media&token=6a28d4d9-377f-4895-bdaf-3c905a7e5f64'
                date='2023-05-10'
            />
            <InterviewItem
                title="개발자 취업 위한 '코딩 테스트', 이렇게 준비하자"
                attribution='YES24'
                linkUrl='https://ch.yes24.com/Article/View/52782'
                imageUrl='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/yes24-compressed.jpg?alt=media&token=264ff9b3-6ff1-4197-aedb-4e8a72cf346b'
                date='2023-02-21'
            />
            <InterviewItem
                title='프로그래머들을 위한 코딩테스트와 기술 면접 저서를 출간한 김현이 동문을 만나다'
                attribution='News H'
                linkUrl='https://www.newshyu.com/news/articleView.html?idxno=1011411'
                imageUrl='https://firebasestorage.googleapis.com/v0/b/hyuni-website.appspot.com/o/news-h-compressed.jpg?alt=media&token=094f113e-431f-4c81-9eeb-5947da32974b'
                date='2023-09-22'
            />
        </Module>
    );
}