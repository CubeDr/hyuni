import Module from '../module';
import ExperienceItem from './experienceItem';

interface ExperienceModuleProps {
    className: string;
}

export default function ExperienceModule({ className }: ExperienceModuleProps) {
    return (
        <Module title='Experience' className={className}>
            <ExperienceItem title='Google' role='Software Engineer' type='FTE' period='2020 Jun~NOW' isOngoing={true} />
            <ExperienceItem title='Line Studio' role='Backend Engineer' type='Intern' period='2020 Jan~Feb' isOngoing={false} />
            <ExperienceItem title='Line Studio' role='Frontend Engineer' type='Intern' period='2019 Jan~Feb' isOngoing={false} />
            <ExperienceItem title='Samsung Electronics' role='VR Engineer' type='Intern' period='2016 Jan~Feb' isOngoing={false} />
        </Module>
    );
}