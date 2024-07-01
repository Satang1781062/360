import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const { tokenId } = response;
      const res = await axios.post(`${process.env.REACT_APP_API}/google-login`, { idToken: tokenId });
      dispatch({
        type: 'LOGIN',
        payload: {
          token: res.data.token,
          user: res.data.user,
        },
      });
      toast.success('Login Success');
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error(error);
      toast.error('Google Login Failed');
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
