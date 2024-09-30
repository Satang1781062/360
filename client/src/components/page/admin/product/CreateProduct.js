import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// function
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";
import { listCategoryService } from "../../../function/categoryservice";

import FileUpload from "../product/FileUpload";
import { Spin } from 'antd';

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);
  const [categoriesService, setCategoriesService] = useState([]);
  const [selectedSource, setSelectedSource] = useState("category"); // Default selection

  useEffect(() => {
    loadData(user.token);
    loadDataService(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadDataService = (authtoken) => {
    listCategoryService(authtoken)
      .then((res) => {
        setCategoriesService(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, price, quantity } = values;

    if (!title || !description || !price || !quantity) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    createProduct(user.token, values)
      .then((res) => {
        toast.success("เพิ่มสินค้า " + res.data.title + " สำเร็จ");
        window.location.reload();
      })
      .catch((err) => {
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
          {loading ? (
            <h1>Loading...<Spin /></h1>
          ) : (
            <h1>Create Product</h1>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Source</label>
              <select
                className="form-control"
                value={selectedSource}
                onChange={handleSourceChange}
              >
                <option value="category">Category</option>
                <option value="categoryService">Category Service</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
                required
              >
                <option>Pless select</option>
                {selectedSource === "category" &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                {selectedSource === "categoryService" &&
                  categoriesService.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
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

export default CreateProduct;
