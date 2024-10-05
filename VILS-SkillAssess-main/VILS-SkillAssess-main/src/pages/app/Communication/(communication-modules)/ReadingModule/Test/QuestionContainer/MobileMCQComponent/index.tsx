import React, { useState } from 'react';
import MCQComponent from '../MCQComponent';
import { useTestContext } from '../../TestProvider';

interface MobileMCQComponentProps {
    data: any;
}

const MobileMCQComponent: React.FC<MobileMCQComponentProps> = ({ data }) => {
    const [currQues, setCurrQues] = useState(0);
    const { solutions, setSolutions } = useTestContext();

    // State to track touch start and end positions
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    // Function to handle swipe right
    const nextQues = () => {
        if (currQues + 1 < data.length) {
            setCurrQues(currQues + 1);
        }
    };

    // Function to handle swipe left
    const prevQues = () => {
        if (currQues > 0) {
            setCurrQues(currQues - 1);
        }
    };

    // Function to handle touch start
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    };

    // Function to handle touch end
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEndX(e.changedTouches[0].clientX);
        handleSwipe();
    };

    // Function to determine swipe direction and perform actions
    const handleSwipe = () => {
        const touchDifference = touchStartX - touchEndX;
        if (Math.abs(touchDifference) > 50) {
            // Threshold for swipe detection
            if (touchDifference > 0) {
                nextQues(); // Swipe left
            } else {
                prevQues(); // Swipe right
            }
        }
    };

    return (
        <div
            className="p-4 md:hidden border-b-[1.5px] border-gray-300"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            key={currQues}
        >
            <MCQComponent
                id={currQues + 1}
                data={data[currQues]}
                solutions={solutions}
                setSolutions={setSolutions}
                key={data[currQues]?.id}
                questionsId={data[currQues]?.id}
            />
        </div>
    );
};

export default MobileMCQComponent;
