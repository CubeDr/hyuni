import Module, { DefaultModuleProps } from '../module';
import SkillRow from './skillRow';

const skills = [
    'Java',
    'C / C++',
    'Typescript',
    'Kotlin',
    'Firebase',
    'Web',
    'Android App',
    'Flutter',
    'React.js',
];
const expertise = [
    'Software Architecture',
    'Clean Code',
    'Readability',
    'Object Oriented Programming',
    'Refactoring',
    'Mentoring',
    'Data Structure',
];

export default function SkillsModule({ className }: DefaultModuleProps) {
    return (
        <Module
            title='Skills & Expertise'
            className={className}>
            <SkillRow skills={skills} direction='forward' />
            <SkillRow skills={expertise} direction='reverse' />
        </Module>
    );
}