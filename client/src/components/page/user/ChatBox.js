import React, { useState, useEffect } from 'react';
import { sendMessage, getUserConversations } from '../../function/chat';
import { io } from 'socket.io-client';

const ChatBox = ({ userId, authtoken }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await getUserConversations(authtoken, userId);
      setMessages(data);
    };

    fetchConversations();
  }, [authtoken, userId]);

  const handleSendMessage = async () => {
    const messageData = {
      sender: userId,
      recipient: 'adminUserId', // แทนที่ด้วย ID ของผู้ดูแลระบบ
      message: newMessage,
    };
    await sendMessage(authtoken, messageData);
    setMessages([...messages, messageData]);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
