import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../card/ProductCard";

//function
import { listProduct, searchFilters } from "../function/product";
import { listCategory } from "../function/category";
import { listCategoryService } from "../function/categoryservice";
import { listProductService, searchFiltersProductService } from "../function/productservice";

// antd
import { Slider, Select, InputNumber, Row, Col } from "antd";
import Footer from "../layouts/Footer";

const { Option } = Select;

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  // Category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  
  // CategoryService
  const [categoryService, setCategoryService] = useState([]);
  const [categoryServiceSelect, setCategoryServiceSelect] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadData();
    listCategory().then((res) => setCategory(res.data));
    listCategoryService().then((res) => setCategoryService(res.data));
  }, []);

  const loadData = () => {
    setLoading(true);
  
    // Load both product and productService
    Promise.all([listProduct(8), listProductService(8)])
      .then(([productRes, productServiceRes]) => {
        setProduct([...productRes.data, ...productServiceRes.data]); // Combine both products and product services
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
    });
  };

  useEffect(() => {
    fetchDataFilter({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleMinPriceChange = (value) => {
    setPrice([value, price[1]]);
  };

  const handleMaxPriceChange = (value) => {
    setPrice([price[0], value]);
  };

  const handleCategorySelectChange = (value) => {
    setCategorySelect(value);
  

    // ทำการกรองสินค้าตามหมวดหมู่สินค้าและหมวดหมู่บริการที่ถูกเลือก
    fetchDataFilter({
        category: value, 
        categoryService: categoryServiceSelect
    });

    // ถ้าไม่มีหมวดหมู่สินค้าและหมวดหมู่บริการถูกเลือก, โหลดสินค้าทั้งหมด
    if (value.length < 1 && categoryServiceSelect.length < 1) {
        loadData();
    }
};

const handleCategoryServiceSelectChange = (value) => {
    setCategoryServiceSelect(value);

    // ทำการกรองสินค้าตามหมวดหมู่สินค้าและหมวดหมู่บริการที่ถูกเลือก
    fetchDataFilter({
        category: categorySelect, 
        categoryService: value
    });

    // ถ้าไม่มีหมวดหมู่สินค้าและหมวดหมู่บริการถูกเลือก, โหลดสินค้าทั้งหมด
    if (value.length < 1 && categorySelect.length < 1) {
        loadData();
    }
};

  return (
    <>
      <div className="container-fluid">
        <div
          className="row"
        >
          <div
            className="col-md-2"
            style={{ backgroundColor: "#e1f8cd33", padding: "10px" }}
          >
            Filter / Search
            <hr />
            <h4>ค้นหาด้วยราคา</h4>
            <Slider value={price} onChange={handlePrice} range max={50000} />
            <Row gutter={8}>
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={50000}
                  value={price[0]}
                  onChange={handleMinPriceChange}
                  placeholder="Min"
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={50000}
                  value={price[1]}
                  onChange={handleMaxPriceChange}
                  placeholder="Max"
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
            <hr />
            <h4>ค้นหาตามหมวดหมู่สินค้า</h4>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="สินค้า360 Healthyshop"
              value={categorySelect}
              onChange={handleCategorySelectChange}
            >
              {category.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="สินค้าบริการ"
              value={categoryServiceSelect}
              onChange={handleCategoryServiceSelectChange}
              
            >
              {categoryService.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
            <hr />
            {/* <h4>ค้นหาตามหมวดหมู่บริการ</h4> */}
            
          </div>
          <div className="col-md-9 d-flex flex-column justify-content-start align-items-center align-self-start mt-5">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-info">Product</h4>
              
            )}
            
            {product.length < 1 && <p>No Product found</p>}

            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-6 col-md-3 mb-3">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Shop;
