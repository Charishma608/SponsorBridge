import { useTestContext } from './provider';
import { useNavigate } from 'react-router-dom';
import BackButton from 'components/Buttons/BackButton';
import { useState } from 'react';
import { cn } from 'utils/helper';
import PrimaryButton from 'components/Buttons/index';
import axiosInstance from 'configs/axios.config';

export default function Comp() {
    const navigate = useNavigate();
    const { data, id } = useTestContext();
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const totalQuestion = data?.questions?.length;
    const [loading, setLoading] = useState(false);

    const [solution, setSolution] = useState<
        {
            id: string;
            answer: string;
        }[]
    >([]);
    const [optionSelected, setOptionSelected] = useState(-1);

    const handleSkip = () => {
        if (currentQuestionNumber < totalQuestion) {
            setCurrentQuestionNumber(currentQuestionNumber + 1);
        }
    };

    const handleSaveAnswer = () => {
        const currentQuestion = data?.questions[currentQuestionNumber];
        if (currentQuestion && optionSelected !== -1) {
            setSolution((prevSolution) => [
                ...prevSolution,
                {
                    id: currentQuestion.id,
                    answer: currentQuestion.options[optionSelected].english_data,
                },
            ]);
            setOptionSelected(-1); // Reset the option selected for the next question
            if (currentQuestionNumber < totalQuestion) {
                setCurrentQuestionNumber(currentQuestionNumber + 1);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const resp = await axiosInstance.post(`/technical-mcq/assessment/${id}/submit`, {
                time_used: '00:05:08',
                questions: solution,
            });
            if (resp.status === 201) {
                alert('Thank you for submitting your test.');
                navigate('/mpsd');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:w-[60%] m-auto pb-8 border-t-8 border-primary flex flex-col h-screen overflow-hidden">
            <div className="flex items-center gap-4 px-4 justify-between">
                <div className="flex items-center gap-4">
                    <BackButton
                        onClick={() => {
                            navigate('/mpsd');
                        }}
                    />
                    <h1 className="text-3xl font-bold my-6">Technical MCQ Assessment</h1>
                </div>
                <p className="font-inter">Time Allocated : {data?.duration_in_minutes} Minutes</p>
            </div>
            {currentQuestionNumber >= totalQuestion ? (
                <div className="text-center flex flex-col gap-5 items-center justify-center font-inter mt-20">
                    <p className="w-1/2">
                        Thank you for taking participation in the test. Please click the submit
                        button to submit your test.
                    </p>
                    <PrimaryButton
                        label="Submit"
                        onClick={handleSubmit}
                        className="w-fit px-8"
                        loading={loading}
                    />
                </div>
            ) : (
                <div className="flex-1 mt-6 font-inter px-4">
                    <p>Question {currentQuestionNumber + 1}:</p>
                    <p className="mt-2 font-medium">
                        {data?.questions[currentQuestionNumber]?.english_question}
                    </p>
                    <p className="mt-2 font-medium">
                        ( {data?.questions[currentQuestionNumber]?.hindi_question} )
                    </p>
                    <div className="mt-6 flex flex-wrap justify-between">
                        {data?.questions?.[currentQuestionNumber]?.options?.map(
                            (dt: any, index: number) => (
                                <div
                                    className={cn(
                                        'w-[49.5%] p-6 border-2 rounded-md mt-2 cursor-pointer',
                                        optionSelected === index &&
                                            'bg-primary border-primary text-white',
                                    )}
                                    id={dt.id}
                                    onClick={() => {
                                        if (optionSelected === -1) {
                                            setOptionSelected(index);
                                        } else {
                                            setOptionSelected(-1);
                                        }
                                    }}
                                >
                                    <p className="text-lg font-medium">{dt.english_data}</p>
                                    <p className="text-lg font-medium">{dt.hindi_data}</p>
                                </div>
                            ),
                        )}
                    </div>

                    <div className="flex items-center justify-center mt-10">
                        <PrimaryButton
                            onClick={() => {
                                if (optionSelected === -1) {
                                    handleSkip();
                                } else {
                                    handleSaveAnswer();
                                }
                            }}
                            label={optionSelected === -1 ? 'Skip' : 'Save & Next'}
                            className="w-fit px-8"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
