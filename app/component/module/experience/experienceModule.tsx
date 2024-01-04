import Module from '../module';

interface ExperienceModuleProps {
    className: string;
}

export default function ExperienceModule({ className }: ExperienceModuleProps) {
    return (
        <Module title='Experience' className={className}>
            Experience Module
        </Module>
    );
}