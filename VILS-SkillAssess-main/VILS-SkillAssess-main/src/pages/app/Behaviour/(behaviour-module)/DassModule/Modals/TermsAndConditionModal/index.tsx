// Components
import Button from 'components/Buttons';
import ModalWrapper from 'components/ModalWrapper';
import TextHeading from 'components/Texts/TextHeading';

interface TermsAndConditionModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const TermsAndConditionModal: React.FC<TermsAndConditionModalProps> = ({ onSuccess, onCancel }) => {
    return (
        <ModalWrapper>
            <div className="w-[600px] px-6 py-4 pb-6 bg-white rounded-md flex flex-col items-center">
                <div className="text-center">
                    <TextHeading>Terms & Conditions</TextHeading>
                    <p className="text-sm text-center">Last update December 28, 2023</p>
                </div>
                <div className="mt-4 flex flex-col gap-4 text-sm">
                    <p>
                        By engaging in the Dass test, you are acknowledging and consenting to the
                        following terms and conditions. The primary objective of this assessment is
                        to gauge and assess your emotional well-being. We assure you that all
                        information obtained during the test will be treated with the utmost
                        confidentiality. Individual results will remain private and will not be
                        disclosed to any external parties without your explicit permission.
                    </p>
                    <p>
                        Participation in the Dass test is entirely voluntary, and you retain the
                        right to withdraw from the assessment at any point without the need for
                        justification. Your decision to participate implies your commitment to
                        providing accurate and truthful information during the test. Deliberate
                        falsification of responses may compromise the reliability of the results and
                        the overall integrity of the assessment process.
                    </p>
                </div>
                <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                        label="Cancel"
                        onClick={onCancel}
                        className="py-1 px-8 bg-red-600 w-fit"
                    />
                    <Button
                        label="Accept"
                        onClick={onSuccess}
                        className="py-1 px-8 bg-green-600 w-fit"
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default TermsAndConditionModal;
