import Module, { DefaultModuleProps } from '../module';
import ExperienceItem from './experienceItem';

export default function ExperienceModule({ className }: DefaultModuleProps) {
    return (
        <Module title='Experience' className={className}>
            <ExperienceItem title='Google' role='Software Engineer' type='FTE' period='2020 Jun~NOW' isOngoing={true} />
            <ExperienceItem title='Line Studio' role='Backend Engineer' type='Intern' period='2020 Jan~Feb' isOngoing={false} />
            <ExperienceItem title='Line Studio' role='Frontend Engineer' type='Intern' period='2019 Jan~Feb' isOngoing={false} />
            <ExperienceItem title='Samsung Electronics' role='VR Engineer' type='Intern' period='2016 Jan~Feb' isOngoing={false} />
        </Module>
    );
}