// Components
import TextCompositionTable from './TextCompositionTable';

interface MainSectionProps {
    data?: any;
}
const MainSection: React.FC<MainSectionProps> = ({ data }) => {
    if (!data?.is_result_generated) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
                <h2 className="font-bold text-2xl text-primary">Result not generated</h2>
                <p>{data?.message}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="shadow-light rounded-md p-4 flex flex-col gap-3 bg-white">
                <h2 className="font-semibold text-primary">Problem Statement</h2>
                <p className="text-sm">{data?.question}</p>
                {data?.image_url && <img src={data?.image_url} alt="question" loading="lazy" />}
            </div>
            <div>
                <h2 className="font-semibold text-primary">Text Composition Analysis</h2>
                <div className="mt-3">
                    <TextCompositionTable data={data} />
                </div>
            </div>
            <div className="shadow-light flex rounded-md bg-white">
                <div className="flex-1 flex flex-col gap-3 p-4 border-r-[0.75px] border-gray-300">
                    <h2 className="font-semibold text-primary">Original Answer</h2>
                    <div className="h-[200px] overflow-y-scroll scroll pe-2">
                        <p className="text-sm text-justify">{data?.scores?.original_sentence}</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 p-4 border-l-[0.75px] border-gray-300">
                    <h2 className="font-semibold text-primary">Corrected Answer</h2>
                    <div className="h-[200px] overflow-y-scroll scroll pe-2">
                        <p className="text-sm text-justify">
                            {data?.scores?.['corrected_sentence ']}
                        </p>
                    </div>
                </div>
            </div>
            <div className="shadow-light rounded-md bg-white flex flex-col gap-3 p-4">
                <h2 className="font-semibold text-primary">Improved IELTS version</h2>
                <p className="text-sm text-justify">{data?.scores?.improved_ielts_version}</p>
            </div>
        </div>
    );
};

export default MainSection;
