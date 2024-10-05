import React from "react";

interface CodingContainerProps {
    code: string;
    language: string;
}

const CodingContainer: React.FC<CodingContainerProps> = ({code, language}) => {
    return (
        <div className="rounded-md shadow-light overflow-hidden w-full h-full flex flex-col">
            <div className="bg-primary px-4 py-3 shadow flex items-center justify-between">
                <p className="text-white">Submitted Code</p>
                <p className="text-white">Language: {language}</p>
            </div>
            <div className="overflow-y-scroll flex-1 p-2">
                <textarea className="text-sm h-full w-full outline-none" value={code} readOnly />
            </div>
        </div>
    );
};
export default CodingContainer;
