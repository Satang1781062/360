// rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";

//functions
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../function/category";

import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateCaterogy = () => {
  const {user} = useSelector((state) => ({...state}));
  console.log('hi state user',user.token);

  const [values, setValues] = useState({
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteCategory(user.token,id)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success('ลบ '+res.data.name+' เรียบร้อย')
      })
      .catch((err) => {
        console.log(err);
        toast.success('Error ! ')
      });
  };

  console.log("data", category);
  const handleChangeCategory = (e) => {
    console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSummit = (e) => {
    // ไม่ให้Reface
    e.preventDefault();
    if (!values.name.trim()) {
      toast.error('กรุณากรอกชื่อหมวดหมู่สินค้า');
      return;
    }
    createCategory(user.token,values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        setValues({ ...values, name: "" }); // Reset input field
        toast.success('เพิ่ม '+res.data.name+' เรียบร้อย')
      })
      .catch((err) => {
        console.log(err);
        toast.success('Error ! ')
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>Create Category</h1>
          <form onSubmit={handleSummit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChangeCategory}
                className="form-control"
              ></input>
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>
          <hr />
          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >
                  x
                </span>
                <span
                  style={{ float: "right" }}
                  className="badge bg-primary rounded-pill"
                >
                  <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCaterogy;
