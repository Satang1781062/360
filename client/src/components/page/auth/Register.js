import React, { useState } from "react";
import { register } from "../../function/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import logo from "./logo/logo.png";

const Register = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.password1) {
      alert("Password Not Match");
    } else {
      register(value)
        .then((res) => {
          toast.success("สมัครสมาชิกสำเร็จ!");
          navigate("/login"); // redirect ไปที่หน้า login
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div
          className="col-md-6"
          style={{
            boxShadow: "0 3px 10px rgba(150, 27, 78, 0.7)",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
            <h4>สมัครสมาชิก</h4>
          </div>

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
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
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

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="password1"
                onChange={handleChange}
              />
            </div>

            <br />
            <div className="d-flex justify-content-center">
              <button
                className="btn"
                style={{ backgroundColor: "#4CB4F6", color: "#fff" }}
                disabled={value.password.length < 6}
              >
                ยืนยัน
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
