// Hooks
import { useTestContext } from '../TestProvider';

// Internal Imports
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// External Imports
import { FaCodeMerge } from 'react-icons/fa6';

// Components
import TextHeading from 'components/Texts/TextHeading';
import Button from 'components/Buttons';
import CodingScreen from './CodingScreen/index';
import OnboardingModal from './OnboardingModal';
import { formatTime } from 'utils/helper';
import TestSubmissionModal from './TestSubmissionModal';
import SubmitConfirmationModal from './SubmitConfirmationModal';
import { useFullScreenDetector } from 'providers/FullScreenDetectorProvider';

const TestModule = () => {
    const { data, solutions, questionSelected, setQuestionSelected, globalTimer } =
        useTestContext();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');

    const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(false);
    const [submitButtonPressed, setSubmitButtonPressed] = useState<boolean>(false);

    useEffect(() => {
        if (globalTimer === 0) {
        }
    }, [globalTimer]);

    if (questionSelected) {
        return <CodingScreen data={questionSelected} />;
    }
    return (
        <div className="w-full h-full">
            {!onboardingCompleted ? (
                <OnboardingModal setOnboardingCompleted={setOnboardingCompleted} />
            ) : null}
            {globalTimer === 0 ? <TestSubmissionModal /> : null}
            {submitButtonPressed ? (
                <SubmitConfirmationModal setSubmitButtonPressed={setSubmitButtonPressed} />
            ) : null}

            <div className="w-4/5 m-auto pt-8 pb-8 h-full overflow-y-scroll">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <TextHeading>{title}</TextHeading>
                        <div className="flex gap-2 items-center">
                            <p className="font-inter">
                                Time Remaining{' '}
                                <span className="bg-gray-300 py-1 px-6 rounded-full">
                                    {formatTime(globalTimer)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p className="text-justify font-inter">
                        This screen presents one coding challenge for candidates to solve within a
                        limited time frame. The question assesses different aspects of programming
                        proficiency, including algorithmic problem-solving and data structure
                        manipulation. Candidates must demonstrate their ability to write efficient
                        and optimized code to solve each problem effectively.
                    </p>
                </div>
                <div className="w-full mt-8 flex flex-col gap-4">
                    {data?.map((props: any) => {
                        const languages = props?.languages
                            ? props?.languages?.map((language: any) => language?.name)
                            : [];
                        return (
                            <QuestionCard
                                key={props?.id}
                                id={props?.id}
                                data={props}
                                languages={languages}
                                setQuestionSelected={setQuestionSelected}
                                attempted={solutions[props?.id]}
                            />
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Button
                        label="Submit Test"
                        onClick={() => {
                            setSubmitButtonPressed(true);
                        }}
                        className="font-inter w-fit px-10 mt-6 bg-green-500 text-md"
                    />
                </div>
            </div>
        </div>
    );
};

interface QuestionCardProps {
    id: string;
    data: any;
    languages: string[];
    setQuestionSelected: React.Dispatch<React.SetStateAction<any>>;
    attempted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    data,
    languages,
    setQuestionSelected,
    attempted,
}) => {
    const { handleGoToFullScreen } = useFullScreenDetector();
    return (
        <div className="rounded-md p-4 shadow-light mx-[1px] flex justify-between items-center gap-4">
            <div className="w-[80%] flex gap-6 items-center">
                <FaCodeMerge className="text-4xl text-primary" />
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">{data?.title}</p>
                    <div className="flex gap-4 divide-x-2">
                        <p className="text-sm text-gray-600 font-medium">Score : {data?.score}</p>
                        <p className="text-sm text-gray-600 font-medium px-4">
                            {/* Time Allocated : {data?.duration_in_minutes} Minutes */}
                        </p>
                    </div>
                    <div className="flex flex-wrap">
                        <p className="text-sm text-gray-600 font-medium">Languages : </p>
                        <div className="flex gap-3 items-center mx-4">
                            {languages.map((language: string) => (
                                <span key={language} className="text-sm text-gray-600 font-medium">
                                    {language},
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    label="Start"
                    className={`px-8 ${attempted ? 'bg-slate-500' : ''}`}
                    onClick={() => {
                        handleGoToFullScreen();
                        setQuestionSelected(data);
                    }}
                    disabled={attempted}
                />
            </div>
        </div>
    );
};

export default TestModule;
