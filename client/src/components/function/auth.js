import axios from 'axios';

export const register = async (value) =>
    await axios.post(process.env.REACT_APP_API + "/register", value);

export const login = async (value) =>
    await axios.post(process.env.REACT_APP_API + "/login", value);

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-user", {},
        {
            headers: {
                authtoken,
            }
        }
    );
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/current-admin", {},
        {
            headers: {
                authtoken,
            },
        }
    );
}
export const loginGoogle = async (data) =>
    await axios.post(process.env.REACT_APP_API + "/login-google", data);

export const loginFacebook = async (data) =>
    await axios.post(process.env.REACT_APP_API + "/login-facebook", data);
