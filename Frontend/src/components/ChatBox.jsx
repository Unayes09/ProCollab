// ChatBox.js

import React, { useState, useEffect } from 'react';
import { RiSendPlane2Line } from 'react-icons/ri'; // Import the send icon from react-icons

import ChatBoxCss from './ChatBox.module.css'; // Import your CSS file
import Navbar from './Navbar';

const ChatBox = () => {
  // Dummy data for channels and chat messages
  

  

  const [chatMessages, setChatMessages] = useState(Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    sender: `User ${(index % 2) + 1}`,
    message: `Message ${index + 1}`,
    timestamp: new Date().toISOString(),
  })));

  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage = {
        id: chatMessages.length + 1,
        sender: 'User 1', // Change this to the actual sender (logged-in user)
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Update the state to include the new message
      setChatMessages([...chatMessages, newChatMessage]);

      // Clear the input field
      setNewMessage('');
    }
  };

  // Use useEffect to scroll the chat to the bottom when new messages are added
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  return (

    <>
      <Navbar/>
      <div className={ChatBoxCss.appwrapper}>
        <div className={ChatBoxCss.chatboxcontainer}>
          <div className={ChatBoxCss.channelssection}>
            <h2>Channel:</h2>
            <p>channel name:  </p>
            <p>channel description </p>
            
        </div>

          <div className={ChatBoxCss.chatsection}>
            <div className={ChatBoxCss.channelname}>
            <h2>channel name now at</h2>
          </div>

            <div className={ChatBoxCss.chatcontainer} id="chat-container">
            {/* Map through chatMessages and display chat messages */}
            {chatMessages.map(message => (
              <div key={message.id} className={ChatBoxCss.chatmessage}>
                <p><strong>{message.sender}:</strong> {message.message}</p>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>

            <div className={ChatBoxCss.messageinput}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>
              <RiSendPlane2Line />
            </button>
          </div>
        </div>
      </div>
      </div>
      </>
  );
}

export default ChatBox;
