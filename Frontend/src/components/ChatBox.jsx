// ChatBox.js

import React, { useState, useEffect } from "react";
import { RiSendPlane2Line } from "react-icons/ri"; // Import the send icon from react-icons

import ChatBoxCss from "./ChatBox.module.css"; // Import your CSS file
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  let [user, setUser] = useState();
  function routetohome() {
    navigate("/signin");
  }
  const [channelData, setChannels] = useState({
    title: "",
    name: "",
    description: "",
    talks: [],
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/verify/" + token,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          //routetohome()
        } else {
          routetohome();
        }
      } catch (error) {}
    };

    checkLoggedIn();
  }, []);
  useEffect(() => {
    const checkUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        await fetch("http://localhost:8000/api/username/" + token, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (response) => {
          const data = await response.json();
          user = data.username;
          setUser(data.username);
        });
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkUsername();
  }, []);

  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    // Fetch projects from the server when the component mounts
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/channels?id=" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const ress = await response.json();
        //setProjects(ress)
        if (response.ok) {
          const updateProjects = async () => {
            setChannels({
              ...channelData,
              title: ress.title,
              description: ress.description,
              name: ress.channel_holder,
              talks: ress.talks,
            });
          };
          await updateProjects();
          const updatetalks = async () => {
            setChatMessages(ress.talks);
            setMessageSent(false);
          };
          await updatetalks();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchChannels();
  }, [messageSent]);

  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        channelId: id,
        username: user,
        talk: newMessage,
      };
      let jsonData = "";
      await fetch("http://localhost:8000/auth/talk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          const updatetalks = async () => {
            setMessageSent(true);
          };
          await updatetalks();
        } else {
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Use useEffect to scroll the chat to the bottom when new messages are added
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <>
      <Navbar />
      <div className={ChatBoxCss.appwrapper}>
        <div className={ChatBoxCss.chatboxcontainer}>
          <div className={ChatBoxCss.channelssection}>
            <h2>{channelData.title}</h2>
            <p>@ {channelData.name}</p>
            <p>{channelData.description}</p>
          </div>

          <div className={ChatBoxCss.chatsection}>
            <div className={ChatBoxCss.channelname}>
              <h2>{channelData.title}</h2>
            </div>

            <div className={ChatBoxCss.chatcontainer} id="chat-container">
              {/* Map through chatMessages and display chat messages */}
              {chatMessages.map((message) => (
                <div key={message._id} className={ChatBoxCss.chatmessage}>
                  <p>
                    <strong>{message.name}:</strong> {message.talk}
                  </p>
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
};

export default ChatBox;
