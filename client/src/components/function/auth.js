import axios from 'axios';


//  "/register","/login"  ดูที่routes
export const register = async (value) =>
    await axios.post(process.env.REACT_APP_API + "/register", value);

export const login = async (value) =>
    await axios.post(process.env.REACT_APP_API + "/login", value);


//(authoken) มาจากไฟล์ server/middleware/auth.js
export const currentUser = async (authtoken) => {
    console.log(authtoken)
    return await axios.post(process.env.REACT_APP_API + "/current-user", {},
        {
            headers:{
                authtoken,
            }
        }
    );
}

export const currentAdmin = async (authtoken) => {
    console.log(authtoken)
    return await axios.post(process.env.REACT_APP_API + "/current-admin", {},
        {
            headers:{
                authtoken,
            },
        }
    );
}