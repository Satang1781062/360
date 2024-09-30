import axios from 'axios';

export const createPromotion = async (authtoken, promotion) => {
  return await axios.post(process.env.REACT_APP_API + '/promotion', promotion, {
    headers: {
      authtoken,
    },
  });
};

export const listPromotions = async () => {
  return await axios.get(process.env.REACT_APP_API + '/promotions');
};

export const updatePromotion = async (authtoken, id, promotion) => {
  return await axios.put(process.env.REACT_APP_API + '/promotion/' + id, promotion, {
    headers: {
      authtoken,
    },
  });
};

export const deletePromotion = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + '/promotion/' + id, {
    headers: {
      authtoken,
    },
  });
};
