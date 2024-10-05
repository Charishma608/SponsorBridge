import ModalWrapper from 'components/ModalWrapper';
import PrimaryButton from 'components/Buttons/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Configs
import axiosInstance from 'configs/coding.config';

const TestSubmissionModal = () => {
    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const handleSubmit = async () => {
        setSubmitLoading(true);
        const navBackUrl = 'gap-analysis';

        try {
            await axiosInstance.post('/student/assessment/submit?action=submit');
            navigate(navBackUrl, { replace: true });
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <ModalWrapper>
            <div className="w-[45vw] bg-white p-6 rounded shadow-lg">
                <h2 className="text-primary text-2xl font-bold">
                    Congratulations on Completing the Test!
                </h2>
                <div className="my-4 font-inter flex flex-col gap-2">
                    <p>
                        Well done! You've successfully completed the test. Your dedication and
                        effort are truly commendable. Now, it's time to submit your responses. Click
                        on the "Submit Test" button below to finalize your answers and conclude this
                        assessment.
                    </p>
                    <p className="font-semibold text-primary-dark">
                        We appreciate your participation and commitment. Thank you for taking the
                        time to complete the test.
                    </p>
                </div>
                <div className="flex items-center justify-end">
                    <PrimaryButton
                        label="Submit Test"
                        onClick={handleSubmit}
                        className="font-inter w-fit px-10 mt-6 bg-green-600"
                        loading={submitLoading}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default TestSubmissionModal;
