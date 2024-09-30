import React, { useState, useEffect } from 'react';
import { sendMessage, getUserChats } from '../../function/chat';

const AdminChat = ({ authtoken }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await getUserChats(authtoken);
      setChats(data);
    };

    fetchChats();
  }, [authtoken]);

  const handleSendMessage = async () => {
    if (!selectedChat) return;

    const messageData = {
      sender: 'adminUserId', // แทนที่ด้วย ID ของแอดมินปัจจุบัน
      recipient: selectedChat._id,
      message: replyMessage,
      respondedBy: 'adminUserId', // แทนที่ด้วย ID ของแอดมิน
    };
    await sendMessage(authtoken, messageData);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, messageData],
    });
    setReplyMessage('');
  };

  return (
    <div className="admin-chat">
      <div className="user-list">
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => setSelectedChat(chat)}
            className={`user ${selectedChat?._id === chat._id ? 'active' : ''}`}
          >
            User {chat._id} {/* ใช้ข้อมูลที่เหมาะสม */}
          </div>
        ))}
      </div>
      <div className="chat-box">
        {selectedChat && (
          <>
            <div className="messages">
              {selectedChat.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'adminUserId' ? 'sent' : 'received'}`}>
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="input-box">
              <input
                type="text"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
