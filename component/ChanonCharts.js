import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const data = [
    {annee:'2016', frenq:'1'},
    {annee:'2017', frenq:'2'},
    {annee:'2018', frenq:'2'},
    {annee:'2019', frenq:'3'},
    {annee:'2020', frenq:'2'},
    {annee:'2021', frenq:'3'},
    {annee:'2022', frenq:'3'},
]

const ChanonCharts = () => {
    return (
        <LineChart width={600} height={300} data={data}>
            <Line 
                type='monotone'
                dataKey='frenq'
                stroke='#8884D8'
                strokeWidth={2}
            />
            <CartesianGrid stroke='#BBB' strokeDasharray='3 3' />
            <XAxis dataKey='annee'/>
            <YAxis  allowDecimals={false} />
            <Tooltip />
            <Legend />            
        </LineChart>
    );
};

export default ChanonCharts;