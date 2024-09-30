import axios from "axios";

export const getArddress = async (authtoken) => {
    return await axios.get("(https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json", {
      headers: {
        authtoken,
      },
    });
  };