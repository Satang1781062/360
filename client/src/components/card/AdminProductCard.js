import React, {  useState } from "react";

import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./Product.css";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  console.log(product);
  const { _id, title, description, images } = product;
  const shortenedDescription = description.slice(0, 20);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="product-card-container">
      <Card
        hoverable
        className="product-card mx-auto" // ใช้คลาสที่ประกาศไว้ใน styles.css
        cover={
          <img
            className="p-1"
            style={{ height: "240px", width: "100%" }}
            alt="example"
            src={images && images.length ? images[0].url : ""}
          />
        }
        actions={[
          <Link to={"/admin/update-product/" + _id}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined
            onClick={() => handleRemove(_id)}
            className="text-danger"
          />,
        ]}
        style={{
          boxShadow: isHovered ? '0 4px 8px rgba(150, 27, 78, 0.7)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Meta title={title} description={shortenedDescription} />{" "}
        {/* ใช้คำอธิบายที่ถูกตัดแล้ว */}
      </Card>
    </div>
  );
};

export default AdminProductCard;
