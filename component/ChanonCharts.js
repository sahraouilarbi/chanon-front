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

const ChanonCharts = ({ id, lng }) => {
  const [yearViewsData, setYearViewsData] = useState([]);
  useEffect(() => {
    const fetchYearViewsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getrecordbyid?id=${id}&lng=${lng}`
        );
        const records = response.data.data;
        console.log('@@ records', records);
        if (records) {
          console.table(records);
          setYearViewsData(records);
        }
      } catch (err) {
        console.error('Error fetching year views data :', err);
      }
    };
    fetchYearViewsData();
  }, [id]);
  return (
    <LineChart width={600} height={300} data={yearViewsData}>
      <Line
        type="monotone"
        dataKey="notoriety"
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
