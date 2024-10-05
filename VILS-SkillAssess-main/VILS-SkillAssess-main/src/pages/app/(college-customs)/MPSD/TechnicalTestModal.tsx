import ModalWrapper from 'components/ModalWrapper';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useState } from 'react';
import RoleSelectionModal from './RoleSelectionModal';

const DepartmentsSelectorModal = ({ onClose }: { onClose: () => void }) => {
    const departments = [
        {
            id: 1,
            name: 'ITI',
            roles: [
                {
                    id: 1,
                    name: 'Computer Operator',
                    testId: '/test/technical-mcq?id=technical-mcq-assessment-295e13ea-9d18-4ca2-bfa1-d8f910f7b1c8&ref=mpsd',
                },
                {
                    id: 2,
                    name: 'Electritian',
                    testId: '/test/technical-mcq?id=technical-mcq-assessment-1c43ba45-8183-4a0e-bed1-6edbdfa74a6e&ref=mpsd',
                },
            ],
        },
    ];
    const [roleBasedModal, setRoleBasedModal] = useState<boolean>(false);
    const [roles, setRoles] = useState<{ id: number; name: string; testId: string }[]>([]);

    if (roleBasedModal && roles.length)
        return <RoleSelectionModal onClose={() => setRoleBasedModal(false)} roles={roles} />;
    return (
        <div className="absolute h-screen w-screen overflow-hidden top-0 left-0 inter">
            <ModalWrapper>
                <div className="bg-white border-4 border-blue-200 p-4 rounded-md">
                    <div className="flex items-center gap-3 text-primary">
                        <button onClick={onClose}>
                            <MdKeyboardBackspace className="text-2xl" />
                        </button>
                        <h4 className="text-primary font-medium">SELECT YOUR DEPARTMENTS</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                        {departments.map((department) => (
                            <div
                                className="border-2 p-4 rounded-md w-[250px] h-[100px] grid place-content-center cursor-pointer hover:bg-blue-50 hover:border-blue-200"
                                key={department.id}
                                onClick={() => {
                                    setRoleBasedModal(true);
                                    setRoles(department.roles);
                                }}
                            >
                                <div className="text-center inter">{department.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};

export default DepartmentsSelectorModal;
