import axios from "axios";

export const createProduct = async (authtoken,value) => {
    return await axios.post(process.env.REACT_APP_API + "/product-service",value,{
      headers:{
        authtoken,
      }
    } );
  };

export const listProductService = async (count) => {
    return await axios.get(process.env.REACT_APP_API + "/product-service/"+count);
  };


export const removeProductService = async (authtoken,id) => 
     await axios.delete(process.env.REACT_APP_API + "/product-service/"+id,
      {
        headers:{
          authtoken
        }
      }
    );

// update
export const readProductService = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/product-service/"+id);
};

export const updateProductService = async (authtoken,id, product) => 
  await axios.put(process.env.REACT_APP_API + "/product-service/"+id,product,
   {
     headers:{
       authtoken
     }
   }
 );


 export const listProductBy = async (sort, order,limit) => {
  return await axios.post(process.env.REACT_APP_API + "/productby-service",{
    sort, 
    order,
    limit,
  });
};

export const searchFiltersProductService = async(arg)=>{
  return await axios.post(process.env.REACT_APP_API + '/search-product-service/filters', arg)
}