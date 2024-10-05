// External Imports
import SplitPane from 'react-split-pane';
import { TbCodeDots } from 'react-icons/tb';

// Styles
import 'styles/components/splitpane.css';

// Components
import QuestionContainer from './QuestionContainer';
import CodingContainer from './CodingContainer';
import { useState } from 'react';

const CodingScreen = ({ data }) => {
    const [rightPaneSize, setRightPaneSize] = useState(
        window.screen.width - 0.45 * window.screen.width,
    );


    return (
      <>
        <div className="h-full overflow-hidden">
            <SplitPane
                split="vertical"
                minSize="20%"
                defaultSize="45%"
                size={window.screen.width - rightPaneSize}
                onChange={(size) => setRightPaneSize(window.screen.width - size)}
            >
                <div
                    className={`h-full w-${
                        window.screen.width - rightPaneSize
                    } overflow-y-scroll overflow-x-hidden relative`}
                >
                    <div className="absolute left-[100%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 p-1 rounded z-20">
                        <TbCodeDots className="text-xl" />
                    </div>
                    <QuestionContainer data={data} />
                </div>
                <div className={`h-full overflow-y-scroll relative`}>
                    <CodingContainer
                        data={data}
                        width={rightPaneSize}
                        setWidth={setRightPaneSize}
                    />
                </div>
            </SplitPane>
        </div></>

    );
};

export default CodingScreen;
