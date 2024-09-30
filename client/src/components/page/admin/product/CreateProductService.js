import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Select, Spin } from "antd";  // Import Select จาก Ant Design

// function
import { createProduct } from "../../../function/productservice";
import { listCategoryService } from "../../../function/categoryservice";

import FileUpload from "../product/FileUpload";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  selectedCategories: [],  // เปลี่ยนเป็น selectedCategories
  price: "",
  quantity: "",
  images: [],
};

const { Option } = Select;

const CreateProductService = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialstate);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategoryService(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChang = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setValues({ ...values, selectedCategories: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, price, quantity, selectedCategories } = values;

    if (!title || !description || !price || !quantity || selectedCategories.length === 0) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่องและเลือกหมวดหมู่");
      return;
    }

    const productData = {
      ...values,
      category: selectedCategories,  // ส่ง selectedCategories ไปที่ backend
    };

    createProduct(user.token, productData)
      .then((res) => {
        toast.success("เพิ่มสินค้า " + res.data.title + " สำเร็จ");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("เพิ่มสินค้าไม่สำเร็จ");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col-md-8">
          {loading
            ? <h1>Loading... <Spin /></h1>
            : <h1>Create Product บริการ</h1>
          }

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChang}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChang}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChang}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChang}
              />
            </div>

            <div className="form-group">
              <label>Categories</label>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select categories"
                value={values.selectedCategories}
                onChange={handleCategoryChange}
              >
                {values.categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>

            <FileUpload
              loading={loading}
              setLoading={setLoading}
              values={values}
              setValues={setValues}
            />

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductService;
