import ModalWrapper from 'components/ModalWrapper';
import PrimaryButton from 'components/Buttons/index';
import { useTestContext } from '../../TestProvider';

interface IOnboardingModal {
    setOnboardingCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnboardingModal = ({ setOnboardingCompleted }: IOnboardingModal) => {
    const { startTimer } = useTestContext();

    return (
        <ModalWrapper>
            <div className="w-[45vw] bg-white p-6 rounded shadow-lg">
                <h2 className="text-primary text-2xl font-bold">Instructions</h2>
                <div className="my-4 font-inter flex flex-col gap-1">
                    <p>
                        Hello practioner, you have been allocated a total of{' '}
                        <span className="font-semibold text-primary-dark">45 Minutes</span> to
                        complete this test. Once your 45 Minutes session is over, the system will
                        automatically submit your answers and then you can exit the test peacefully.
                    </p>
                    <p className="font-semibold text-primary-dark">
                        But please note that, once you have started any question, you must submit
                        that question before switching to the next question (in case of multiple
                        questions). If you exit it in the middle you won't be able to go back to
                        that question.
                    </p>
                    <p>
                        If you clearly read the instructions and click on the below start test
                        button. Clicking on the start test button will start the timer for your 45
                        Minutes session.
                    </p>
                </div>
                <div className="flex items-center justify-end">
                    <PrimaryButton
                        label="Start Test"
                        onClick={() => {
                            setOnboardingCompleted(true);
                            startTimer();
                        }}
                        className="font-inter w-fit px-10 mt-6"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default OnboardingModal;
