import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import { TimeScale, LinearScale, PointElement, LineElement } from "chart.js";
import "chartjs-adapter-date-fns";
import PieChart from "./chart/PieChart";
import MenubarAdmin from "../../layouts/MenubarAdmin";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async (month) => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API + "/sales-data",
          {
            headers: {
              authtoken: localStorage.getItem("authtoken"),
            },
            params: {
              month,
            },
          }
        );

        if (data && data.length > 0) {
          const dates = data.map((item) => item.date);
          const sales = data.map((item) => item.sales);
          const total = data.reduce((acc, curr) => acc + curr.sales, 0);

          setChartData({
            labels: dates,
            datasets: [
              {
                label: "ยอดขาย",
                data: sales,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: "rgba(75, 192, 192, 0.6)",
                pointBorderColor: "rgba(75, 192, 192, 1)",
                pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                pointHoverBorderColor: "rgba(75, 192, 192, 1)",
              },
            ],
          });

          setTotalSales(total);
        } else {
          setChartData({
            labels: [],
            datasets: [],
          });
          setTotalSales(0);
        }
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
          <div className="col-6 col-md-4 mt-5">
            <h2>ยอดขาย</h2>
            <div>
              <label htmlFor="month-select">เลือกเดือน: </label>
              <select id="month-select" onChange={handleMonthChange}>
                <option value="">ทั้งหมด</option>
                <option value="1">มกราคม</option>
                <option value="2">กุมภาพันธ์</option>
                <option value="3">มีนาคม</option>
                <option value="4">เมษายน</option>
                <option value="5">พฤษภาคม</option>
                <option value="6">มิถุนายน</option>
                <option value="7">กรกฎาคม</option>
                <option value="8">สิงหาคม</option>
                <option value="9">กันยายน</option>
                <option value="10">ตุลาคม</option>
                <option value="11">พฤศจิกายน</option>
                <option value="12">ธันวาคม</option>
              </select>
            </div>
            {/* {chartData.datasets.length > 0 ? <Line data={chartData} options={{ scales: { x: { type: 'time' } } }} /> : <p>ไม่มีข้อมูลการขาย</p>} */}
            {chartData.datasets.length > 0 ? (
              <Line
                data={chartData}
                options={{
                  scales: { x: { type: "time", time: { unit: "day" } } },
                }}
              />
            ) : (
              <p>ไม่มีข้อมูลการขาย</p>
            )}
            <div>
              <p>ราคารวม: {totalSales}</p>
            </div>
          </div>
          <div className="col-6 col-md-4 mt-5">
          <PieChart/>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-6 col-md-6">
          <PieChart/>
          </div>
          
        </div> */}
      </div>
    </>
  );
};

export default AdminChart;
