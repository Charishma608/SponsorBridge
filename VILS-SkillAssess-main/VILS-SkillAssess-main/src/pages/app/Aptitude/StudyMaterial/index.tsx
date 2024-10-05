// Internal Imports
import { useCallback, useEffect, useState } from 'react';

// Configs
import axios from 'configs/axios.config';

// Components
import LoadingScreen from './LoadingScreen';
import DocViewerContainer from './DocViewerContainer';

const cache = {
    data: null,
};

const StudyMaterialPage = () => {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileSelected, setFileSelected] = useState<any>(null);

    const CARDS_COLORS = [
        '#037AD6',
        '#39D38966',
        '#FF0606',
        '#FF6060',
        '#FF904066',
        '#3EA3B966',
        '#3EA3B966',
        '#3EA3B966',
        '#AEE1FF',
        '#8FB94B',
        '#FF904066',
        '#CE7A63',
    ];

    const loadStudyMaterial = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/aptitude/load-all-study-material');
            setData(res.data?.[0]?.study_material);
            cache.data = res.data?.[0]?.study_material;
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!cache.data) {
            loadStudyMaterial();
        } else {
            setData(cache.data);
        }
    }, [loadStudyMaterial]);

    if (isLoading) return <LoadingScreen />;
    if (fileSelected) {
        return (
            <DocViewerContainer
                docUrl={fileSelected?.url}
                title={fileSelected?.title}
                onBack={() => {
                    setFileSelected(null);
                }}
            />
        );
    }
    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-2">
            {data?.map((material: any, index: number) => (
                <StudyMaterialCard
                    key={index}
                    data={material}
                    color={CARDS_COLORS[index % CARDS_COLORS?.length]}
                    onClick={() => {
                        setFileSelected(material);
                    }}
                />
            ))}
        </div>
    );
};

interface StudyMaterialCardProps {
    data: any;
    color: string;
    onClick?: () => void;
}

const StudyMaterialCard: React.FC<StudyMaterialCardProps> = ({
    data,
    color,
    onClick = () => {},
}) => {
    return (
        <div
            className="rounded-md shadow-light md:w-[30%] overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <div className={`border-l-8 p-4 h-full`} style={{ borderColor: color }}>
                <p className="font-semibold">{data?.title === 'dummy' ? 'Basics' : data?.title}</p>
            </div>
        </div>
    );
};

export default StudyMaterialPage;
