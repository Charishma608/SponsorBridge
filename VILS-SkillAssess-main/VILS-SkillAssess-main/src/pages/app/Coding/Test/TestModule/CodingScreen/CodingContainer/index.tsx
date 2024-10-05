// Internal Imports
import { useCallback, useEffect, useRef, useState } from 'react';

// Components
import Select from 'components/Select';
import Button from 'components/Buttons';

// External Imports
import { BiFullscreen } from 'react-icons/bi';
import { BiExitFullscreen } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import MonacoEditor from '@monaco-editor/react';

// Configs
import axiosInstance from 'configs/coding.config';
import { useTestContext } from '../../../TestProvider';
import { formatTime } from 'utils/helper';
import { useAlert } from 'providers/AlertProvider';
import { useNavigate } from 'react-router-dom';

interface CodingContainerProps {
    data?: any;
    width: number;
    setWidth: (value: number) => void;
}

const CodingContainer: React.FC<CodingContainerProps> = ({
    data,
    width,
    setWidth
}) => {
    const languages = data?.languages
        ? data?.languages?.map((language: any) => language?.name)
        : [];

    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        languages.length ? languages[0] : 'cpp',
    );

    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { setSolutions, setQuestionSelected, solutions, globalTimer } = useTestContext();

    const [selectedLanguageMetaData, setSelectedLanguageMetaData] = useState<any>(
        data?.languages?.[0],
    );
    const [testCase, setTestCase] = useState<string>(data?.sample_test_cases[0].input);
    const [runLoading, setRunLoading] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [code, setCode] = useState(data?.languages?.[0]?.default_code);
    const [testcaseContainerOpened, setTestcaseContainerOpened] = useState<boolean>(false);
    const [runStatus, setStatus] = useState<string | null>(null);
    const [stdOut, setStdOut] = useState<string | null>(null);
    const [deleteCount, setDeleteCount] = useState<number>(0);
    const [backSpaceCount, setBackSpaceCount] = useState<number>(0);
    const [submitVerdict, setSubmitVerdict] = useState<any>(null);

    const listenerRef = useRef<HTMLDivElement>(null);

    let prev = useRef<null | string>('');

    const handleRunTestCase = async () => {
        setRunLoading(true);
        setTestcaseContainerOpened(true);
        setSubmitVerdict(null);
        let payload: any = {
            language_id: selectedLanguageMetaData?.id,
            source_code: btoa(code),
        };

        if (testCase === '') {
            payload.input = btoa(data?.sample_test_cases?.[0]?.input);
        } else {
            payload.input = btoa(testCase);
        }

        try {
            const resp = await axiosInstance.post('/student/code/run', payload);
            setStatus(resp.data.status);
            setStdOut(resp.data.stdout);
        } catch (err) {
            console.log(err);
        } finally {
            setRunLoading(false);
        }
    };

    const handleSubmit = useCallback(async () => {
        setSubmitLoading(true);
        setTestcaseContainerOpened(true);
        setSubmitVerdict(null);
        let payload: any = {
            language_id: selectedLanguageMetaData?.id,
            source_code: btoa(code),
            // time_taken: timer,
            backspace_count: backSpaceCount,
            delete_count: deleteCount,
        };

        try {
            const resp = await axiosInstance.post(
                '/student/question/' + data?.id + '/submit',
                payload,
            );

            if (resp.data.verdict === 'Accepted') {
            // if (resp) {
                setSolutions((prev: any) => {
                    return { ...prev, [data?.id]: true };
                });
                setStatus(resp.data.verdict);
                setStdOut(null);
                setSubmitVerdict(resp?.data);
                
            } else {
                // setStatus(resp.data.verdict);
                setStatus("Test case's failed please resubmit the code");
                setStdOut(null);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backSpaceCount, code, data?.id, deleteCount, selectedLanguageMetaData?.id, setSolutions]);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            let hold = document?.getElementsByClassName('lines-content')[0]?.textContent;
            if (e.key === 'Backspace') {
                if (hold !== prev.current) {
                    setBackSpaceCount((prev) => prev + 1);
                }
            } else if (e.key === 'Delete') {
                if (hold !== prev.current) {
                    setDeleteCount((prev) => prev + 1);
                }
            }

            prev.current = hold;
        },
        [prev],
    );

    const handleMaximizeMinimize = () => {
        if (window.screen.width === width) {
            setWidth(window.screen.width - 0.45 * window.screen.width);
        } else {
            setWidth(window.screen.width);
        }
    };

    const handleExitQuestion = () => {
        setSolutions((prev: any) => {
            return { ...prev, [data?.id]: true };
        });
        setQuestionSelected(null);
    };

    useEffect(() => {
        const hold = data?.languages.find((language: any) => language.name === selectedLanguage);
        setSelectedLanguageMetaData({ ...hold });
        setCode(hold?.default_code);
        setDeleteCount(0);
        setBackSpaceCount(0);
    }, [selectedLanguage, data?.languages]);

    useEffect(() => {
        let holdRef: any = null;
        if (listenerRef.current) {
            listenerRef.current.addEventListener('keyup', handleKeyPress);
            holdRef = listenerRef.current;
        }

        return () => {
            // clearInterval(interval);
            holdRef?.removeEventListener('keyup', handleKeyPress);
        };
    }, [
        // timer,
        setSolutions,
        handleKeyPress,
        data?.id,
        setQuestionSelected,
        runLoading,
        submitLoading,
    ]);

    useEffect(() => {
        if (listenerRef && listenerRef.current) {
            listenerRef.current.addEventListener('keydown', (e) => {
                const { ctrlKey, code } = e;
                if (ctrlKey && (code === 'KeyC' || code === 'KeyV')) {
                    e.preventDefault();
                }
            });
        }
    }, [listenerRef]);

    useEffect(() => {
        if (globalTimer === 0)
            showAlert(
                'Oops times up, click on the okay button and you will redirected to the main screen',
                () => {
                    setQuestionSelected(null);
                },
            );
    }, [globalTimer, showAlert, navigate, setQuestionSelected]);

    return (
        <>
            <div className="h-full w-full flex flex-col overflow-hidden">
                <div className="bg-primary h-[50px] flex items-center justify-between shadow px-4">
                    <div className="flex items-center gap-3">
                        <Select
                            options={languages}
                            value={selectedLanguage}
                            setValue={setSelectedLanguage}
                            className="bg-white rounded-md"
                            classWidth="w-36"
                        />
                        <button onClick={handleMaximizeMinimize} className="text-white text-2xl">
                            {width === window.screen.width ? (
                                <BiExitFullscreen />
                            ) : (
                                <BiFullscreen />
                            )}
                        </button>
                    </div>
                    <div className="text-white flex gap-6 items-center">
                        <div className="flex items-center gap-2 font-inter">
                            Time Remaining:
                            <p>{formatTime(globalTimer)}</p>
                        </div>

                        <div>
                            <Button
                                label="Exit"
                                onClick={handleExitQuestion}
                                className="bg-red-500 w-[100px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full overflow-y-scroll">
                    <div className="flex flex-col divide-y-2 divide-primary h-full">
                        <div className="overflow-y-scroll" ref={listenerRef}>
                            <MonacoEditor
                                language={
                                    selectedLanguage === 'C++'
                                        ? 'cpp'
                                        : selectedLanguage.toLowerCase()
                                }
                                height={800}
                                theme="vs-dark"
                                value={code}
                                options={{
                                    selectOnLineNumbers: true,
                                    contextmenu: false,
                                }}
                                onChange={(e) => {
                                    if (e) {
                                        setCode(e);
                                    }
                                }}
                                width={width}
                                className="h-full"
                            />
                        </div>
                        <div>
                            <div>
                                <div className="flex justify-between items-center py-2 px-4 bg-gray-200">
                                    <p className="font-semibold">Test against Custom Input</p>
                                    <button
                                        onClick={() => {
                                            setTestcaseContainerOpened((prev) => !prev);
                                        }}
                                    >
                                        {testcaseContainerOpened ? (
                                            <FaChevronDown />
                                        ) : (
                                            <FaChevronUp />
                                        )}
                                    </button>
                                </div>
                                {testcaseContainerOpened ? (
                                    <div className="flex w-full bg-gray-200 gap-2 pb-2 px-4">
                                        <div className={`flex flex-col gap-2 bg-gray-200 w-full`}>
                                            <p className="text-sm">Input</p>
                                            <textarea
                                                value={testCase}
                                                onChange={(e) => setTestCase(e.target.value)}
                                                className="text-sm h-[200px] w-full rounded-md resize-none outline-none focus:border-primary border-[1.5px] border-transparent p-3"
                                            ></textarea>
                                        </div>
                                        <div className={`flex flex-col gap-2 bg-gray-200 w-full`}>
                                            <p className="text-sm">Output</p>
                                            <div
                                                className={`h-[200px] w-full rounded-md resize-none outline-none overflow-x-scroll bg-white ${
                                                    runStatus !== 'Success' ? 'border-red-600' : ''
                                                } border-[1.5px] border-transparent p-3 text-sm`}
                                            >
                                                <p
                                                    className={`font-semibold ${
                                                        runStatus !== 'Success' &&
                                                        runStatus !== 'Accepted'
                                                            ? 'text-red-500'
                                                            : 'text-green-500'
                                                    }`}
                                                >
                                                    {runStatus}
                                                </p>
                                                {submitVerdict && (
                                                    <div className={'flex flex-col gap-1 mt-2'}>
                                                        <p className="whitespace-pre-wrap">
                                                            Memory: {submitVerdict?.memory}
                                                        </p>
                                                        <p className="whitespace-pre-wrap">
                                                            Runtime: {submitVerdict?.runtime}
                                                        </p>
                                                        <p className="whitespace-pre-wrap">
                                                            Test Cases Passed:{' '}
                                                            {submitVerdict?.passed_test_cases}/
                                                            {submitVerdict?.total_test_cases}
                                                        </p>
                                                    </div>
                                                )}
                                                <p className="whitespace-pre-wrap">{stdOut}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex items-center justify-end gap-4 py-2 px-4 border-t-[1.5px] border-gray-300">
                                <div>
                                    <Button
                                        label="Compile"
                                        className="w-[180px]"
                                        disabled={runLoading || submitLoading}
                                        loading={runLoading}
                                        onClick={handleRunTestCase}
                                    />
                                </div>
                                <div>
                                    <Button
                                        label="Submit"
                                        className={`w-[180px] ${
                                            solutions[data?.id] ? 'bg-slate-500' : 'bg-primary'
                                        }`}
                                        disabled={
                                            runLoading || submitLoading || solutions[data?.id]
                                        }
                                        loading={submitLoading}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodingContainer;