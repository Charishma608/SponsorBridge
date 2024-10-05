import { cn } from 'utils/helper';
import Loader from 'components/Loaders';

// External Imports
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

// Hooks
import { useTestContext } from '../TestProvider';

const NavigationBar = () => {
    const {
        solutions,
        currentQuestionData,
        currentQuestionIndex,
        totalQuestion,
        handleGoToNextQuestion,
        handleGoToPrevQuestion,
    } = useTestContext();

    const checkIfIsSolved = (question_id: string) => {
        const sol = solutions.filter((solution: any) => solution.id === question_id);
        if (sol.length === 0) return false;
        return true;
    };

    return (
        <div className="hidden md:flex items-center justify-center gap-4 py-4">
            <IconButton
                label="Previous"
                icon={<GrLinkPrevious />}
                iconAligment="left"
                className={`w-[100px] md:w-[150px] py-1 ${
                    currentQuestionIndex === 0 ? 'bg-gray-500 cursor-not-allowed' : ''
                }`}
                onClick={handleGoToPrevQuestion}
            />
            <div className="flex items-center gap-2">
                {currentQuestionData?.questions?.map((question: any, idx: number) => {
                    return (
                        <div
                            className={`h-7 w-7 rounded-full cursor-pointer text-white grid place-content-center text-sm ${
                                checkIfIsSolved(question.id) ? 'bg-green-600' : 'bg-gray-500'
                            }`}
                        >
                            {idx + 1}
                        </div>
                    );
                })}
            </div>
            <IconButton
                label="Next"
                icon={<GrLinkNext />}
                iconAligment="right"
                className={`w-[100px] md:w-[150px] py-1 ${
                    currentQuestionIndex + 1 === totalQuestion
                        ? 'bg-gray-500 cursor-not-allowed'
                        : ''
                }`}
                onClick={handleGoToNextQuestion}
            />
        </div>
    );
};

export default NavigationBar;

interface IconButtonProps {
    icon: React.ReactNode;
    label: string;
    className?: string;
    onClick?: () => void;
    iconAligment?: string;
    loading?: boolean;
    loaderLargeArcColor?: string;
    loaderSmallArcColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon = null,
    label = '',
    className = '',
    onClick = () => {},
    iconAligment = 'right',
    loading = false,
    loaderLargeArcColor = 'text-gray-200',
    loaderSmallArcColor = 'fill-blue-600',
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'bg-primary py-2 px-2 md:px-6 rounded-3xl text-white text-sm flex items-center justify-center gap-2',
                className,
            )}
            disabled={loading}
        >
            {loading ? (
                <Loader
                    loadingText={false}
                    size="sm"
                    largeArcColor={loaderLargeArcColor}
                    smallArcColor={loaderSmallArcColor}
                />
            ) : (
                <>
                    {iconAligment === 'left' && icon ? icon : null}
                    <p className="hidden md:block">{label}</p>
                    {iconAligment === 'right' && icon ? icon : null}
                </>
            )}
        </button>
    );
};
