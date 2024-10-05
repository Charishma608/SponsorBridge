// External Imports
import Chart from 'react-apexcharts';

// Custom Styles
import 'styles/components/focusLineRadarGraph.css';

interface DataProp {
    label: string;
    value: number;
}

interface FocusLineRadarGraphProps {
    data: DataProp[];
}

const generateSeries = (data: DataProp[]) => {
    let length = data.length;
    let series = [];

    for (let i = 0; i < length; i++) {
        let d = new Array(length).fill(0);
        d[i] = data[i].value;
        series.push({ data: d });
    }

    return series;
};

const generateCategories = (data: DataProp[]): string[] => {
    let length = data.length;
    let categories: string[] = [];

    for (let i = 0; i < length; i++) {
        categories.push(data[i].label);
    }

    return categories;
};

const generateColors = (data: DataProp[]): string[] => {
    let length = data.length;
    let colors: string[] = [];

    for (let i = 0; i < length; i++) {
        // let color = data[i].value >= 75 ? '#02BC63' : data[i].value >= 40 ? '#0280D4' : '#EB5757';
        // colors.push(colors);
        colors.push('#0280D4');
    }

    return colors;
};

const FocusLineRadarGraph: React.FC<FocusLineRadarGraphProps> = ({ data = [] }) => {
    const colors = generateColors(data);
    const categories = generateCategories(data);
    const series = generateSeries(data);

    const options = {
        chart: {
            fontFamily: 'Inter, sans-serif',
            toolbar: { show: false },
        },
        stroke: {
            show: true,
            width: 4,
            colors: colors,
        },
        markers: { colors: colors },
        yaxis: { labels: { style: { fontSize: '0px' } } },
        xaxis: {
            categories: categories,
            labels: { style: { fontSize: '14px', colors: new Array(data.length).fill('#000000') } },
        },
        legend: { show: false },
        tooltip: {
            enabled: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
                return (
                    '<div class="focusLineRadarGraph-container">' +
                    '<span class="focusLineRadarGraph-label">' +
                    w.globals.labels[dataPointIndex] +
                    ' : ' +
                    '</span>' +
                    '<span class="focusLineRadarGraph-label">' +
                    series[seriesIndex][dataPointIndex] +
                    '</span>' +
                    '</div>'
                );
            },
        },
    };
    return (
        <div>
            <div className="h-[300px] -ml-[50px] -mt-[50px]">
                <Chart options={options} series={series} type="radar" height={400} />
            </div>
        </div>
    );
};

export default FocusLineRadarGraph;
