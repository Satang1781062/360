import React, { useState } from "react";
import { register, login } from "../../function/auth"; // รวมการ import จาก auth function ไฟล์เดียว
import { Spin } from "antd";
import { toast } from "react-toastify";

//redux
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // นำเข้า useNavigate

// import GoogleLoginComponent from "./GoogleLogin";

import logo from"./logo/logo.png"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // let history = useHistory();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/index");
      } else {
        navigate("/user/index");
      }
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(value);
    //code
    login(value)
      .then((res) => {
        setLoading(false);
        // console.log('res',res.data);
        toast.success(res.data.payload.user.username + " Login Success");
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container p-2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {loading ? (
            <h1>
              Loading ...
              <Spin />
            </h1>
          ) : (
            <div className="text-center mb-4">
              <img
                src={logo} // ใช้ตัวแปร logo ที่ import มา
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
              <h4>เข้าสู่ระบบ</h4>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <br />
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;