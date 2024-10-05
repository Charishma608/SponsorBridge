interface TextCompositionTableProps {
    data: any;
}

const TextCompositionTable: React.FC<TextCompositionTableProps> = ({ data }) => {
    return (
        <div className="flex text-sm shadow-light rounded-md overflow-hidden bg-white">
            <TableCard label="Word Count" value={data?.word_count} position="front" />
            <TableCard label="Backspace Count" value={data?.backspace_count} />
            <TableCard label="Delete Count" value={data?.delete_count} />
            <TableCard label="Space Count" value={data?.space_count} />
            <TableCard label="Paragraph Count" value={data?.paragraph_count} position="last" />
        </div>
    );
};

interface TableCardProps {
    label: string;
    value?: number;
    position?: 'front' | 'last' | '';
}

const TableCard: React.FC<TableCardProps> = ({ label, value, position = '' }) => {
    return (
        <div className="flex flex-col flex-1">
            <div
                className={`border-[0.75px] border-t-0 ${
                    position === 'front' ? 'border-s-0' : position === 'last' ? 'border-e-0' : ''
                } border-gray-300 bg-gray-50 text-center py-2`}
            >
                {label}
            </div>
            <div
                className={`border-[0.75px] border-b-0 ${
                    position === 'front' ? 'border-s-0' : position === 'last' ? 'border-e-0' : ''
                } border-gray-300 text-center py-2`}
            >
                {value ? value : '-'}
            </div>
        </div>
    );
};

export default TextCompositionTable;
