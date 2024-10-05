// import IconButton from 'components/Buttons/IconButton';

// import React, { useState } from 'react';

// import { IoIosArrowUp } from 'react-icons/io';
// import { IoIosArrowDown } from 'react-icons/io';
// import { IoIosCloseCircle } from 'react-icons/io';
// import { FaCheckCircle } from 'react-icons/fa';

interface QuestionCardProps {
    data: any;
    quesNo: number;
}

const FillInTheBlankCard: React.FC<QuestionCardProps> = ({ data, quesNo }) => {
    // const [showExplanation, setShowExplanation] = useState(false);
    return (
        <div className="mb-8">
            <div className="text-xl font-bold my-4">Question {quesNo}</div>
            <div className="text-xl font-semibold my-4"> {data?.question}</div>
            <div>Will be updated soon</div>
        </div>
    );
};

export default FillInTheBlankCard;
