// External Imports
import Tooltip from 'rc-tooltip';
import { IoInformation } from 'react-icons/io5';

interface TooltipProps {
    label: string;
    position?:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom'
        | undefined;
    showArrow?: boolean;
}

const TooltipComp: React.FC<TooltipProps> = ({ label, position = '', showArrow = false }) => {
    return (
        <Tooltip
            placement={position}
            trigger={['hover']}
            overlay={<p className="text-md max-w-[300px] rounded-md bg-white">{label}</p>}
            overlayClassName="opacity-100 border-[1px] border-primary rounded-md p-[0px] overflow-hidden"
            overlayInnerStyle={{ border: 'none', margin: 0 }}
            showArrow={showArrow}
        >
            <div className="h-5 min-w-5 grid place-content-center bg-primary text-white rounded-full cursor-help">
                <IoInformation />
            </div>
        </Tooltip>
    );
};

export default TooltipComp;
