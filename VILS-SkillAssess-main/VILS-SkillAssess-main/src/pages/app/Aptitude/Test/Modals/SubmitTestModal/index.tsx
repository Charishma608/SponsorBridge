// Components
import Button from 'components/Buttons';
import ModalWrapper from 'components/ModalWrapper';
import TextSubHeading from 'components/Texts/TextSubHeading';

// Internal Imports
import { useState } from 'react';

interface SubmitTestModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const SubmitTestModal: React.FC<SubmitTestModalProps> = ({ onCancel, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    return (
        <ModalWrapper>
            <div className="w-[50vw] bg-white p-[10%] rounded-md flex flex-col items-center justify-center gap-2">
                <TextSubHeading className="text-center">
                    Last chance to review! Submitting the test is final.
                </TextSubHeading>
                <p className="text-gray-800 text-center text-sm">
                    Are you sure you want to proceed and complete your test now?
                </p>
                <div className="mt-4 flex md:flex-row flex-col gap-2">
                    <Button
                        label="Cancel"
                        onClick={onCancel}
                        className="px-8 py-1 bg-green-50 text-black w-[150px]"
                    />
                    <Button
                        label="Submit"
                        onClick={async () => {
                            setIsSubmitting(true);
                            onSuccess();
                        }}
                        className="px-8 py-1 bg-green-500 w-[150px]"
                        loading={isSubmitting}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
};

export default SubmitTestModal;
