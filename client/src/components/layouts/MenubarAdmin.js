import React from "react";
import { Link } from "react-router-dom";

import "./MenubarAdmin.css";
const MenubarAdmin = () => {
  return (
    <nav className="navAdmin">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/index">แดชบอร์ด</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-admin">จัดการผู้ใช้งาน</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/create-category">เพิ่มหมวดหมู่360</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/create-category-service">เพิ่มหมวดหมู่บริการ</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/create-product">เพิ่มสินค้า</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/promotion-product">จัดโปรโมชัน</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders">จัดการ Orders</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/chart-sell">บทวิเคราะห์</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarAdmin;
