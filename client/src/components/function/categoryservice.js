import axios from "axios";

export const createCategoryService = async (authtoken,value) => {
    return await axios.post(process.env.REACT_APP_API + "/categoryservice",value,{
      headers:{
        authtoken,
      }
    } );
  };
export const listCategoryService = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/categoryservice",{
    headers:{
      authtoken,
    }
  } );
};
export const deleteCategoryService = async (authtoken,id) => {
  return await axios.delete(process.env.REACT_APP_API + "/categoryservice/"+id,{
    headers:{
      authtoken,
    }
  } );
};
     
export const ReadCategoryService = async (authtoken,id) => {
  return await axios.get(process.env.REACT_APP_API + "/categoryservice/"+id,{
    headers:{
      authtoken,
    }
  } );
};
     
export const EditCategoryService = async (authtoken,id,value) => {
  return await axios.put(process.env.REACT_APP_API + "/categoryservice/"+id,value ,{
    headers:{
      authtoken,
    }
  } );
};   
  