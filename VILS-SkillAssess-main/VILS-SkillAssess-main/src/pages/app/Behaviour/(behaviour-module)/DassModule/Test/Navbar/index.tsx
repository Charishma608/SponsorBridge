// Internal Imports
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import ExitTestModal from '../Modals/ExitTestModal';
import SubmitTestModal from '../Modals/SubmitTestModal';
import Button from 'components/Buttons';

// Configs
import axios from 'configs/axios.config';

// Hooks
import { useTestContext } from '../TestProvider';
import { useAlert } from 'providers/AlertProvider';

const Navbar = () => {
    const { data, exitButtonPressed, setExitButtonPressed, solutions, totalQuestion, testId } =
        useTestContext();
    const navigate = useNavigate();

    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
    const { showAlert } = useAlert();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const handleSubmitTest = async () => {
        let payload: any = {
            data: {},
        };
        for (let i = 0; i < solutions.length; i++) {
            payload.data[solutions[i]?.question_id] = solutions[i].answer;
        }

        try {
            const navBackUrl = '/gap-analysis';

            const res = await axios.post(`/dasa/${testId}/submit-test`, payload);
            if (res.status === 201) {
                showAlert(
                    'Thank you for submitting your test! Your report will be generated shortly, and we appreciate your patience in awaiting the results',
                );
                navigate(-2);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full border-[1.5px] border-gray-300 gap-1 rounded-md p-2 flex items-center justify-between">
            <div className="flex gap-2 items-end">
                <p className="text-primary font-semibold ps-2 border-e-[1.5px] border-gray-300 pe-4">
                    DASS Test
                </p>
                <p className="bg-gray-100 rounded-3xl text-xs px-4 py-1">
                    Test ID: {data?.test_id}
                </p>
            </div>
            <div className="flex gap-2">
                {/* <Button
                    onClick={() => {
                        setExitButtonPressed(true);
                    }}
                    label="Exit Test"
                    className="rounded-md w-fit px-2 lg:px-8 bg-red-600"
                /> */}
                <Button
                    label="Submit Test"
                    className="rounded-md w-fit px-4 lg:px-8"
                    onClick={() => {
                        if (totalQuestion !== solutions.length) {
                            showAlert('You need to answer all the questions to submit the test.');
                            return;
                        }
                        setSubmitButtonPressed(true);
                    }}
                />
            </div>
            {exitButtonPressed && <ExitTestModal />}
            {submitButtonPressed && (
                <SubmitTestModal
                    onCancel={() => {
                        setSubmitButtonPressed(false);
                    }}
                    onSuccess={handleSubmitTest}
                />
            )}
        </div>
    );
};

export default Navbar;
