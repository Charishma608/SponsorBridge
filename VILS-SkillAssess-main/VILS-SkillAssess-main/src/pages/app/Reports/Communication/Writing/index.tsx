// Internal Imports
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

// Components
import ReportCard from 'components/Cards/ReportCard';
import NoDataScreen from '../../NoDataScreen';
import LoadingScreen from '../../LoadingScreen';

// Configs
import axios from 'configs/axios.config';
import { IoArrowBackSharp } from 'react-icons/io5';

const Writing = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [viewReportsButtonClicked, setViewReportsButtonClicked] = useState<boolean>(false);
    const [assessmentId, setAssessmentId] = useState<string>('');
    const [assessmentTitle, setAssessmentTitle] = useState<string>('');
    const [data, setData] = useState<any>();

    const loadAllReports = useCallback(async () => {
        const requestUrl =
            viewReportsButtonClicked && assessmentId !== ''
                ? `/writing/assessment/${assessmentId}/report/all`
                : `/report/communication/writing`;

        try {
            setIsLoading(true);
            const response = await axios.get(requestUrl);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [viewReportsButtonClicked, assessmentId]);

    function formatTimestamp(timestamp: string): string {
        // Parse the input timestamp
        const date = new Date(timestamp);

        // Arrays for month and day names
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        // Get components from the date object
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        // Convert 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Format minutes to be two digits
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        // Construct the formatted string
        return `${day} ${month} ${year} at ${hours}:${formattedMinutes} ${ampm}`;
    }

    useEffect(() => {
        loadAllReports();
    }, [loadAllReports]);

    if (isLoading) return <LoadingScreen />;
    if (viewReportsButtonClicked) {
        return (
            <div className="flex flex-col gap-4 my-4">
                <div className="flex items-center gap-4">
                    <button
                        className="h-8 w-8 rounded-full bg-primary text-white grid place-content-center"
                        onClick={() => {
                            setViewReportsButtonClicked(false);
                        }}
                    >
                        <IoArrowBackSharp size={24} />
                    </button>
                    <p className="font-semibold text-lg text-primary">{assessmentTitle} </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    {data?.map((dt: any, index: number) => (
                        <div className="flex flex-col p-4 rounded-lg shadow-md border-2">
                            <p className="font-semibold">{assessmentTitle}</p>
                            <div className="my-2 text-gray-600 text-sm">
                                <p>Submitted on :</p>
                                <p>{formatTimestamp(dt.submitted_at)}</p>
                            </div>
                            <button
                                className="py-2 text-center text-white rounded-full w-full bg-primary/90 mt-4"
                                onClick={() => {
                                    navigate({
                                        pathname: '/reports/writing-report',
                                        search: new URLSearchParams({
                                            id: dt.id,
                                        }).toString(),
                                    });
                                }}
                            >
                                View Report
                            </button>
                        </div>
                    ))}
                    {data?.length === 0 ? <NoDataScreen /> : null}
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-wrap gap-4">
            {data?.map((dt: any, index: number) => (
                <ReportCard
                    key={index}
                    title={dt.title}
                    description={dt.description}
                    duration={dt.duration}
                    questionCount={dt.number_of_questions}
                    onClick={() => {
                        setAssessmentId(dt.test_id);
                        setAssessmentTitle(dt.title);
                        setViewReportsButtonClicked(true);
                    }}
                    buttonLabel={'View Reports'}
                />
            ))}
            {data?.length === 0 ? <NoDataScreen /> : null}
        </div>
    );
};

export default Writing;
