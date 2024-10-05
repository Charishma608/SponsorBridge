import ModalWrapper from 'components/ModalWrapper';
import PrimaryButton from 'components/Buttons/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Configs
import axiosInstance from 'configs/coding.config';
import screenfull from 'screenfull';

interface ISubmitConfirmationModal {
    setSubmitButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitConfirmationModal = ({ setSubmitButtonPressed }: ISubmitConfirmationModal) => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');
    const referenceBackId = searchParams.get('referenceBackId');

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setSubmitLoading(true);
        try {
            await axiosInstance.post('/student/assessment/submit?action=submit');

            const navBackUrl = ref ? `/${ref}?ref=${referenceBackId}` : '/coding-pro';

            if (screenfull.isEnabled) {
                screenfull.exit();
            }
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
                <h2 className="text-primary text-2xl font-bold">Confirm Submission</h2>
                <div className="my-4 font-inter flex flex-col gap-2">
                    <p>
                        You still have time remaining, which you can utilize to review and revise
                        your answers. Once you submit, you won't be able to make any further
                        changes.
                    </p>
                    <p>
                        Please take a moment to review your responses. If you're confident with your
                        answers, go ahead and click "Submit". Otherwise, you can continue working
                        until the time expires.
                    </p>
                </div>
                <div className="flex items-center gap-3 justify-end mt-6">
                    <PrimaryButton
                        label="Sure, I will Review"
                        onClick={() => {
                            setSubmitButtonPressed(false);
                        }}
                        className="font-inter w-fit px-10"
                    />
                    <PrimaryButton
                        label="No thanks, I will Submit"
                        onClick={handleSubmit}
                        className="font-inter w-fit px-10 bg-green-600"
                        loading={submitLoading}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default SubmitConfirmationModal;
