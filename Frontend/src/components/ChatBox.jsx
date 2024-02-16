// ChatBox.js

import React, { useState, useEffect } from 'react';
import { RiSendPlane2Line } from 'react-icons/ri'; // Import the send icon from react-icons

import ChatBoxCss from './ChatBox.module.css'; // Import your CSS file
import Navbar from './Navbar';

const ChatBox = () => {
  // Dummy data for channels and chat messages
  
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  const [channelData, setChannels] = useState(
{
    title: '',
    name:'',
    description: '',
    talks:[],
    });
  
   const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
        // Fetch projects from the server when the component mounts
        const fetchChannels = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/channels?id='+id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
    
                });
                const ress = await response.json()
                //setProjects(ress)
                if (response.ok) {
                  const updateProjects = async () => {
                    console.log(ress)
                    setChannels({ ...channelData, title: ress.title, description: ress.description,name: ress.channel_holder,talks: ress.talks  })
                    console.log(channelData.title);
                    //console.log(channelData.talks)
                    
                    }
                  await updateProjects();
                  const updatetalks = async () => {
                    setChatMessages(ress.talks)
                   // console.log(channelData.title);
                    //console.log(channelData.talks)
                    
                    }
                    await updatetalks();
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
          }
        }
        fetchChannels();
    }, []);
  //console.log(id)
 

  console.log(chatMessages)

  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending a new message
  const handleSendMessage = () => {
    
    // datafetch to database by post api

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
            <h2>{channelData.title}</h2>
            <p>@ {channelData.name}</p>
            <p>{ channelData.description}</p>
            
        </div>

          <div className={ChatBoxCss.chatsection}>
            <div className={ChatBoxCss.channelname}>
            <h2>channel name now at</h2>
          </div>

            <div className={ChatBoxCss.chatcontainer} id="chat-container">
            {/* Map through chatMessages and display chat messages */}
            {chatMessages.map(message => (
              <div key={message._id} className={ChatBoxCss.chatmessage}>
                <p><strong>{message.name}:</strong> {message.talk}</p>
                
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
