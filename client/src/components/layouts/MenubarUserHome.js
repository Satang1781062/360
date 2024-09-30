import React from "react";
import { Link } from "react-router-dom";

// นำเข้ารูปโลโก้
import healthyshop from "../layouts/MenuUser/360Shop.png";
import careUhome from "../layouts/MenuUser/CareUhome.png";
import dreamsLab from "../layouts/MenuUser/DreamsLAB.png";
import goodHealthGoodJob from "../layouts/MenuUser/GoodHealthGoodJob.png";
import leDream from "../layouts/MenuUser/LeDream.png";

import "./MenubarUserHome.css";

const MenubarUserHome = () => {
  return (
    <nav className="navUserHome">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/shop?categoryType=360&category=all">
            <img src={healthyshop} alt="360HealthyShop" className="menu-logo" />
            360HealthyShop
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shop?categoryType=service&category=all">
            <img src={careUhome} alt="Care U Home" className="menu-logo" />
            Care U Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shop?categoryType=service&category=all">
            <img src={dreamsLab} alt="DreamsLab" className="menu-logo" />
            DreamsLab
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shop?categoryType=service&category=all">
            <img src={goodHealthGoodJob} alt="GoodHealthGoodJob" className="menu-logo" />
            GoodHealthGoodJob
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shop?categoryType=service&category=all">
            <img src={leDream} alt="LeDream" className="menu-logo" />
            LeDream
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarUserHome;