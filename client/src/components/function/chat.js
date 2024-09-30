import axios from 'axios';

export const sendMessage = async (authtoken, messageData) => {
  return await axios.post(process.env.REACT_APP_API + '/chat/send', messageData, {
    headers: {
      authtoken,
    },
  });
};

export const getUserConversations = async (authtoken, userId) => {
  return await axios.get(process.env.REACT_APP_API + '/chat/messages/' + userId, {
    headers: {
      authtoken,
    },
  });
};

export const getAllConversations = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + '/chat/all-conversations', {
    headers: {
      authtoken,
    },
  });
};

export const getUserChats = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + '/chat/user-chats', {
    headers: {
      authtoken,
    },
  });
};
