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
          <Link to="/admin/create-category">เพิ่มหมวดหมู่</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/create-product">เพิ่มสินค้า</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/orders">จัดการ Orders</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenubarAdmin;
