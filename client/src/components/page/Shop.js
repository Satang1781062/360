import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../card/ProductCard";

// Function imports
import { listProduct, searchFilters } from "../function/product";
import { listCategory } from "../function/category";
import { listCategoryService } from "../function/categoryservice";

// Ant Design
import { Slider, Select } from "antd";
import Footer from "../layouts/Footer";
import { useLocation } from "react-router-dom";

import "./Shop.css";
const { Option } = Select;

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  // Category state
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  const [categoryType, setCategoryType] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const location = useLocation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct(100)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        fetchDataFilter({ query: text });
      } else {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  useEffect(() => {
    fetchDataFilter({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCategoryChange = (value) => {
    setCategorySelect(value);
    fetchDataFilter({ category: value });
    if (value.length < 1) {
      loadData();
    }
  };

  const handleCategoryTypeChange = (value) => {
    setCategoryType(value);
    if (value === "360") {
      listCategory().then((res) => setCategory(res.data));
    } else if (value === "service") {
      listCategoryService().then((res) => setCategory(res.data));
    }
    setCategorySelect([]); // Reset the selected category
  };

  // ตรวจสอบการเปลี่ยนแปลงค่าใน query parameters เพื่ออัพเดต categoryType และ category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryTypeFromUrl = params.get("categoryType");
    const categoryFromUrl = params.get("category");

    if (categoryTypeFromUrl && categoryTypeFromUrl !== categoryType) {
      handleCategoryTypeChange(categoryTypeFromUrl);
    }

    if (categoryTypeFromUrl && categoryFromUrl === "all") {
      setTimeout(() => {
        setCategorySelect(category.map((item) => item._id)); // เลือกทุก category
        fetchDataFilter({ category: category.map((item) => item._id) }); // ใช้ category ที่เลือกทั้งหมด
      }, 300);
    }
  }, [location.search, categoryType, category]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-2"
            style={{ backgroundColor: "#e1f8cd33", padding: "10px" }}
          >
            Filter / Search
            <hr />
            <h4>ค้นหาด้วยราคา</h4>
            <Slider value={price} onChange={handlePrice} range max={50000} />
            <hr />
            <h4>ประเภทหมวดหมู่</h4>
            <Select
              style={{ width: "100%" }}
              value={categoryType}
              onChange={handleCategoryTypeChange}
            >
              <Option value="360">หมวดหมู่ของสินค้า 360</Option>
              <Option value="service">หมวดหมู่สินค้าบริการ</Option>
            </Select>
            <hr />
            <h4>ค้นหาตามหมวดหมู่</h4>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              value={categorySelect}
              onChange={handleCategoryChange}
            >
              {category.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="col-md-9 d-flex flex-column justify-content-start align-items-center align-self-start mt-5">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-info">Product</h4>
            )}

            {product.length < 1 && <p>No Product found</p>}

            <div className={`row pb-5 ${product.length === 1 ? "justify-content-center" : ""}`}>
              {product.map((item, index) => (
                <div
                  key={index}
                  className={`${product.length === 1 ? "col-12" : "col-10 col-md-3"} mb-3`}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
