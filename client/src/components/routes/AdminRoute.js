// UserRoute.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../function/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ok, setOk] = useState(false)
//   console.log('userRoute',user)

  useEffect(()=>{
    if(user && user.token){
        currentAdmin(user.token)
        .then(res=>{
            //res
            console.log(res)
            setOk(true)
        }).catch(err=>{
            //err
            console.log(err)
            setOk(false)
        })
    }


  },[user])

  return ok ? children : <LoadingToRedirect />;
};

export default AdminRoute; // Export เป็น default
