import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchProductSalesData = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API + "/product-sales-data", {
          headers: {
            authtoken: localStorage.getItem('authtoken')
          }
        });

        if (data && data.length > 0) {
          const titles = data.map(item => item._id);
          const totalSold = data.map(item => item.totalSold);

          setChartData({
            labels: titles,
            datasets: [
              {
                label: 'จำนวนขาย',
                data: totalSold,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40'
                ],
                hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40'
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          });
        } else {
          setChartData({
            labels: [],
            datasets: []
          });
        }
      } catch (error) {
        console.error('Error fetching product sales data', error);
      }
    };

    fetchProductSalesData();
  }, []);

  return (
    <div className="container">
      <h2>จำนวนการขายสินค้า</h2>
      {chartData.datasets.length > 0 ? <Bar data={chartData} options={{ scales: { x: { type: 'category' } } }} /> : <p>ไม่มีข้อมูลการขาย</p>}
    </div>
  );
};

export default BarChart;
