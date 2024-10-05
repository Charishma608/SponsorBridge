// External Imports
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// Styles
import 'styles/components/docViewerContainer.css';

// Components
import FullScreen from 'components/FullScreen';
import BackButton from 'components/Buttons/BackButton';
import TextHeading from 'components/Texts/TextHeading';

interface DocViewerContainerProps {
    docUrl: string;
    title: string;
    onBack: () => void;
}

const DocViewerContainer: React.FC<DocViewerContainerProps> = ({ docUrl, title, onBack }) => {
    const docs = [
        {
            uri: docUrl,
            fileType: 'docx',
            fileName: `${title}.docx`,
        },
    ];
    return (
        <FullScreen>
            <div className="flex flex-col h-full">
                <div className="flex items-center p-4 gap-4">
                    <BackButton onClick={onBack} />
                    <TextHeading>Study Materials / {title}</TextHeading>
                </div>
                <div className="flex-1" id="__doc_viewer_container__">
                    <DocViewer
                        pluginRenderers={DocViewerRenderers}
                        documents={docs}
                        config={{
                            header: {
                                disableHeader: true,
                                disableFileName: false,
                                retainURLParams: true,
                            },
                            csvDelimiter: ',', // "," as default,
                            pdfZoom: {
                                defaultZoom: 1.1, // 1 as default,
                                zoomJump: 0.2, // 0.1 as default,
                            },
                            pdfVerticalScrollByDefault: true, // false as default
                        }}
                    />
                </div>
            </div>
        </FullScreen>
    );
};

export default DocViewerContainer;
