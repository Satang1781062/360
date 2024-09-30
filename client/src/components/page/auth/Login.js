import React, { useState } from "react";
import { login, loginGoogle, loginFacebook, register } from "../../function/auth";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from '@mui/material';

import logo from "./logo/logo.png";
import { BsFacebook } from 'react-icons/bs';

import axios from 'axios';

import { auth, googleAuthProvider } from "../../firebase";

import { useSelector } from "react-redux";

const Login = () => {

  // const tang = useSelector(())

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
        navigate("/");
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
    login(value)
      .then((res) => {
        setLoading(false);
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

 

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/login-facebook`,
          { accessToken: response.accessToken }
        );

        toast.success(data.user.username + " Login Success");
        dispatch({
          type: "LOGIN",
          payload: {
            token: data.token,
            username: data.user.username,
            role: data.user.role,
          },
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        roleBaseRedirect(data.user.role);
      } catch (error) {
        setLoading(false);
        console.error("Facebook login failed:", error);
        toast.error("Facebook login failed");
      }
    }
  };


  const handleLoginByGoogle = async () => {
    try {
        const result = await auth.signInWithPopup(googleAuthProvider);
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        // ส่งข้อมูลไปยัง backend เพื่อบันทึกการล็อกอินของผู้ใช้ Google
        const { data } = await loginGoogle({
            idToken: idTokenResult.token,
            username: user.displayName, 
            email: user.email,
            picture: user.photoURL,
        });

        if (data && data.user && data.user.username) {
            dispatch({
                type: "LOGIN",
                payload: {
                    token: data.token,
                    username: data.user.username,
                    email: data.user.email,
                    role: data.user.role,
                    picture: data.user.picture,
                },
            });

            localStorage.setItem("token", data.token);
            roleBaseRedirect(data.user.role);
        } else {
            console.error("Google login failed: No username returned");
            toast.error("Google login failed: No username returned");
        }
        
    } catch (err) {
        console.error("Google login failed:", err);
        toast.error("Google login failed");
    }
};

// const handleLoginByGoogle = async () => {
//   // code
//   auth.signInWithPopup(googleAuthProvider)
//     .then(async (result) => {
//       //code return data from server
//      // console.log('result', result)
//       const { user } = result
//       const idToken = await user.getIdTokenResult();
//       //console.log(user.email, idToken.token)

//       register(idToken.token)
//       .then((res)=>{
//         //code
//         dispatch(login({
//           email: res.data.email,
//           name: res.data.name,
//           token: idToken.token
//         }))
//       })
//       .catch((err)=>console.log(err))

//     })
//     .catch((err) => {
//       // err
//       console.log(err)
//     })



// }

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6" style={{
            boxShadow: "0 3px 10px rgba(150, 27, 78, 0.7)",
            padding: "15px",
            borderRadius: "5px",
          }}>
          {loading ? (
            <h1>
              Loading ...
              <Spin />
            </h1>
          ) : (
            <div className="text-center mb-4">
              <img
                src={logo}
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
            <div className="d-flex justify-content-center">
    <button className="btn me-3"
    style={{ backgroundColor: "#FF70A6", color: "#fff" }}
    >เข้าสู่ระบบ</button>
    <button className="btn"
    style={{ backgroundColor: "#4CB4F6", color: "#fff" }}
    onClick={() => navigate("/register")}>
      สมัครสมาชิก
    </button>
  </div>
          </form>
          <br />
          
          
          {/* <FacebookLogin
            appId="1459334144769319"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={renderProps.onClick}
                startIcon={<BsFacebook />}
              >
                SIGN IN WITH Facebook
              </Button>
            )}
          />
          <Button onClick={handleLoginByGoogle}>SignIn Google</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
