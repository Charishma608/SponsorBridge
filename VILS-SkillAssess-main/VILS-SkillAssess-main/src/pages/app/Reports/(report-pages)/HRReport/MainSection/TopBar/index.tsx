// Components
import TextSubHeading from 'components/Texts/TextSubHeading';

// Hooks
import { useHRReportsContext } from '../../HRReportProvider';

// External Imports
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

const TopBar = () => {
    const { currentQuestionIndex, handleGoToNextQuestion, handleGoToPrevQuestion, data } =
        useHRReportsContext();

    return (
        <div className="border p-4 flex items-center justify-between">
            <TextSubHeading className="text-primary">Question Wise Report</TextSubHeading>
            <div className="flex gap-6 items-center text-sm">
                <button
                    className={`flex items-center gap-2 ${
                        currentQuestionIndex === 0
                            ? 'cursor-not-allowed text-gray-700'
                            : 'text-primary cursor-pointer'
                    }`}
                    onClick={handleGoToPrevQuestion}
                >
                    <GrLinkPrevious />
                    <p>Prev Q</p>
                </button>
                <button
                    className={`flex items-center gap-2 ${
                        currentQuestionIndex === data?.question_wise_result.length - 1
                            ? 'cursor-not-allowed text-gray-700'
                            : 'text-primary cursor-pointer'
                    }`}
                    onClick={
                        currentQuestionIndex !== data?.question_wise_result.length - 1
                            ? handleGoToNextQuestion
                            : () => {}
                    }
                >
                    <p>Next Q</p>
                    <GrLinkNext />
                </button>
            </div>
        </div>
    );
};

export default TopBar;
