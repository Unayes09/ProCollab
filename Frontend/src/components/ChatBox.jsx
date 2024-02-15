// ChatBox.js

import React, { useState, useEffect } from 'react';
import { RiSendPlane2Line } from 'react-icons/ri'; // Import the send icon from react-icons

import './ChatBox.css'; // Import your CSS file
import Navbar from './Navbar';

const ChatBox = () => {
  // Dummy data for channels and chat messages
  const [channels, setChannels] = useState(Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Channel ${index + 1}`,
  })));

  const [currentChannel, setCurrentChannel] = useState(channels[0]);

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
    <div className="app-wrapper">
      <div className="chat-box-container">
        <div className="channels-section">
          <h2>Channels</h2>
          <div className="channel-list">
            {/* Map through channels and display channel names */}
            {channels.map(channel => (
              <div key={channel.id} className={`channel ${currentChannel.id === channel.id ? 'active' : ''}`} onClick={() => setCurrentChannel(channel)}>
                {channel.name}
              </div>
            ))}
          </div>
        </div>

        <div className="chat-section">
          <div className="channel-name">
            <h2>{currentChannel.name}</h2>
          </div>

          <div className="chat-container" id="chat-container">
            {/* Map through chatMessages and display chat messages */}
            {chatMessages.map(message => (
              <div key={message.id} className="chat-message">
                <p><strong>{message.sender}:</strong> {message.message}</p>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>

          <div className="message-input">
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
