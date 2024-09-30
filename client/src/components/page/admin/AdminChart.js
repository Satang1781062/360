import React from "react";
import PieChart from "./chart/PieChart";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import BarChart from "./chart/BarChart";
import LineChart from "./chart/LineChart";

const AdminChart = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-10 ">
          <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 mt-5">
              <LineChart />
            </div>
            <div className="col-12 col-md-6 mt-5">
              <PieChart />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-md-6 mt-5 mb-5">
              <BarChart />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChart;
