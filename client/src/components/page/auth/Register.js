import React, { useState } from "react";
// import ReactDOM from 'react-dom';
import { register } from "../../function/auth";
import { toast } from "react-toastify";

import logo from"./logo/logo.png"

const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  // console.log(value)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (value.password !== value.password1) {
      alert("Password Not Match");
    } else {
      register(value)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data);
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
        <div className="col-md-6 offset-md-3">
        <div className="text-center mb-4">
              <img
                src={logo} // ใช้ตัวแปร logo ที่ import มา
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
              <h4>เข้าสู่ระบบ</h4>
            </div>
          <h1>Register Page</h1>

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

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
              className="form-control"
              type="password" name="password1" onChange={handleChange} />
            </div>

          <br />
            <button 
            className="btn"
            style={{ backgroundColor: '#008000', color: '#fff' }}
            disabled={value.password.length < 6}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
