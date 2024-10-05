import ModalWrapper from 'components/ModalWrapper';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useState } from 'react';
import AudioVideoCheckModal from './AudioVideoCheckModal';
import { useNavigate } from 'react-router-dom';

const RoleSelectionModal = ({
    onClose,
    roles,
}: {
    onClose: () => void;
    roles: { id: number; name: string; testId: string }[];
}) => {
    const [audioVideoCheckerModal, setAudioVideoCheckerModal] = useState<boolean>(false);
    const [role, setRole] = useState<{ id: number; name: string; testId: string } | null>(null);
    // const [links, setLinks] = useState<{ _id: string; name: string }[]>([]);
    const navigate = useNavigate();

    if (audioVideoCheckerModal && role !== null)
        return (
            <AudioVideoCheckModal
                onSuccess={() => {
                    navigate(role.testId);
                }}
                onCancel={() => {
                    setAudioVideoCheckerModal(false);
                }}
            />
        );
    else
        return (
            <div className="absolute h-screen w-screen overflow-hidden top-0 left-0 inter">
                <ModalWrapper>
                    <div className="bg-white border-4 border-blue-200 p-4 rounded-md">
                        <div className="flex items-center gap-3 text-primary">
                            <button onClick={onClose}>
                                <MdKeyboardBackspace className="text-2xl" />
                            </button>
                            <h4 className="text-primary font-medium">SELECT YOUR JOB ROLE</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                            {roles.map((role) => (
                                <div
                                    className="border-2 p-4 rounded-md w-[250px] h-[100px] grid place-content-center cursor-pointer hover:bg-blue-50 hover:border-blue-200"
                                    key={role.id}
                                    onClick={() => {
                                        setAudioVideoCheckerModal(true);
                                        setRole(role);
                                    }}
                                >
                                    <div className="text-center inter">{role.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalWrapper>
            </div>
        );
};

export default RoleSelectionModal;
