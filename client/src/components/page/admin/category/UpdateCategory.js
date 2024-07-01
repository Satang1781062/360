import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { ReadCategory, EditCategory } from "../../../function/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const params = useParams();

  // console.log(params.id)
  const [name, setName] = useState("");

  useEffect(() => {
    //code
    loadData(user.token,params.id);
  }, []);

  const loadData = (authtoken,id) => {
    ReadCategory(authtoken,id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSummit = (e) => {
    e.preventDefault();
    EditCategory(user.token,params.id, { name })
      .then((res) => {
        console.log(res);
        navigate("/admin/create-category");
        toast.success("แก้ไขเป็น " + res.data.name + " เรียบร้อย!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(name);
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col">
          <h1>UPDATE Category </h1>
          <form onSubmit={handleSummit}>
            <div className="form-group">
              <label>Update Category</label>
              <input
                className="form-control"
                value={name}
                autoFocus
                required
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-outline-primary">Summit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
