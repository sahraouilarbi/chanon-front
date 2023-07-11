import { useEffect, useState } from 'react';
import axios from 'axios';
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
  { annee: '2016', frenq: '1' },
  { annee: '2017', frenq: '2' },
  { annee: '2018', frenq: '2' },
  { annee: '2019', frenq: '3' },
  { annee: '2020', frenq: '2' },
  { annee: '2021', frenq: '3' },
  { annee: '2022', frenq: '3' },
];

const ChanonCharts = ({ id }) => {
  const [yearViewsData, setYearViewsData] = useState([]);
  useEffect(() => {
    const fetchYearViewsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getrecordbyid?id=${id}`
        );
        const records = response.data.data;
        console.log('@@ records', records);
        if (records) {
          console.table(records);
          setYearViewsData(records);
        }
      } catch (error) {
        console.log('Error fetching year views data :', error);
      }
    };

    fetchYearViewsData();
  }, [id]);
  console.log('@@ yearViewsData', yearViewsData);
  return (
    <LineChart width={600} height={300} data={yearViewsData}>
      <Line
        type="monotone"
        dataKey="views_average"
        stroke="#8884D8"
        strokeWidth={2}
      />
      <CartesianGrid stroke="#BBB" strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default ChanonCharts;
