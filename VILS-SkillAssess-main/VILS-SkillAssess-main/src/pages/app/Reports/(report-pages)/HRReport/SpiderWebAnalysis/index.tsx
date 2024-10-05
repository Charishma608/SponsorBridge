import { MdCancel } from 'react-icons/md';
import { useHRReportsContext } from '../HRReportProvider';

const SpiderWebAnalysis = () => {
    const { handleToggleSpiderWebAnalysis } = useHRReportsContext();
    return (
        <div className="w-[90%] h-[90%] bg-white p-[2%]">
            <div className="flex  justify-end">
                <MdCancel onClick={handleToggleSpiderWebAnalysis} />
            </div>
            <div className=" mt-4 border-[1px] border-gray-300 rounded-md overflow-hidden">
                <div className="border-b-[1px] border-gray-300 bg-gray-50 py-2">
                    <p className="font-semibold text-sm text-center">
                        Characteristics Wise Fluctuation 📈
                    </p>
                </div>

                {/* <p className="text-center mt-2 bg-gray-50 py-2 border-t-[1px] border-gray-300">
                                Q: Question
                            </p> */}
            </div>
        </div>
    );
};

export default SpiderWebAnalysis;
