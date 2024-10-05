import ModalWrapper from 'components/ModalWrapper';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useState } from 'react';
import RoleSelectionModal from './RoleSelectionModal';

const DepartmentsSelectorModal = ({ onClose }: { onClose: () => void }) => {
    const departments = [
        {
            id: 1,
            name: 'Computer Science Engineering',
            roles: [
                {
                    id: 1,
                    name: 'Software Engineer',
                    testId: 'mock-interview-assessment-6a22aadf-83b5-4e4c-9788-1ae726073250',
                },
                {
                    id: 2,
                    name: 'AI Engineer',
                    testId: 'mock-interview-assessment-ca32823b-70aa-49c9-b797-4639974ad7e1',
                },
                {
                    id: 3,
                    name: 'Cloud Engineer',
                    testId: 'mock-interview-assessment-c870f84e-85b2-4633-9cb9-247fb34bce51',
                },
                {
                    id: 4,
                    name: 'DevOps Engineer',
                    testId: 'mock-interview-assessment-674dfa46-8c94-4db8-84e0-2193fe0d1794',
                },
                {
                    id: 5,
                    name: 'Frontend Engineer',
                    testId: 'mock-interview-assessment-81a53b9c-0931-4ac4-b818-37ebcc38e4f1',
                },
                {
                    id: 6,
                    name: 'ML Engineer',
                    testId: 'mock-interview-assessment-e173f167-4540-4857-a08a-55f84edb5b9a',
                },
            ],
        },
        {
            id: 2,
            name: 'Electronics and Communication Engineering',
            roles: [
                {
                    id: 1,
                    name: 'Electronics Engineer',
                    testId: 'mock-interview-assessment-d391c3c9-2d93-434f-a490-ba30eb8ba908',
                },
                {
                    id: 2,
                    name: 'Communications Engineer',
                    testId: 'mock-interview-assessment-56c773d8-2a7e-402b-8f00-ce01dade685c',
                },
            ],
        },
        {
            id: 3,
            name: 'Electrical Engineering',
            roles: [
                {
                    id: 1,
                    name: 'Electrical Engineer',
                    testId: 'mock-interview-assessment-2533b5de-7dc0-4359-a538-1818c2451d69',
                },
            ],
        },
        {
            id: 4,
            name: 'Mechanical Engineering',
            roles: [
                {
                    id: 1,
                    name: 'Mechanical Engineer',
                    testId: 'mock-interview-assessment-30ecbfa8-a3db-4543-adc9-a0897bf575b8',
                },
                {
                    id: 2,
                    name: 'Automotive Engineer',
                    testId: 'mock-interview-assessment-d96384b5-c39b-4afc-9c1b-cb1175eb128a',
                },
            ],
        },
        {
            id: 5,
            name: 'Civil Engineering',
            roles: [
                {
                    id: 1,
                    name: 'Civil Engineer',
                    testId: 'mock-interview-assessment-8cc11125-676d-4bb7-9897-c8c9577d1a81',
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 max-h-[550px] overflow-hidden overflow-y-scroll">
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
