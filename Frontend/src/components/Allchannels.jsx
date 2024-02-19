import Navbar from "./Navbar";
import allchnlcss from "./Allchannels.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({
  keys,
  name,
  description,
  tags,
  joinedCount,
  onJoin,
  user,
}) => {
  const navigate = useNavigate();
  const joindirect = async (e) => {
    navigate('/chatbox?id='+keys)
  };
  const join = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        id: keys,
        username: user,
      };
      let jsonData = "";
      await fetch("https://procollab-backends.onrender.com/auth/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const data = await response.json();
        navigate('/chatbox?id='+keys)
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  let isJoin = false;
  for (let i = 0; i < onJoin.length; i++) {
    if (onJoin[i].name == user) isJoin = true;
  }
  return (
    <div className={allchnlcss.channelCard}>
      <div className={allchnlcss.topsection}>
        <div className={allchnlcss.channelName}>{name}</div>
        <div className={allchnlcss.joinedCount}>
          {joinedCount} <span className={allchnlcss.icon}>👥</span>
        </div>
      </div>
      <div className={allchnlcss.channelDescription}>{description}</div>
      <div className={allchnlcss.bottomsection}>
        <div className={allchnlcss.tagList}>
          {tags.map((tag, index) => (
            <span key={index} className={allchnlcss.tag}>
              {tag}
            </span>
          ))}
        </div>
        {isJoin && (
          <button className={allchnlcss.joinButton} onClick={joindirect}>
            <span className={allchnlcss.buttonIcon}>🔗</span> Go Channel
          </button>
        )}
        {!isJoin && (
          <button className={allchnlcss.joinButton} onClick={join}>
            <span className={allchnlcss.buttonIcon}>🔗</span> Join Channel
          </button>
        )}
      </div>
    </div>
  );
};

function Allchannels() {
  const navigate = useNavigate();
  let [user, setUser] = useState();
  function routetohome() {
    navigate("/signin");
  }
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://procollab-backends.onrender.com/api/verify/" + token,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
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
        await fetch("https://procollab-backends.onrender.com/api/username/" + token, {
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

  const [channel, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchChannels = async () => {
      try {
        console.log(user);
        let response;
        if (search == "") {
          response = await fetch("https://procollab-backends.onrender.com/api/channels", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          response = await fetch(
            "https://procollab-backends.onrender.com/api/channelSearch?word=" + search,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        const ress = await response.json();
        if (response.ok) {
          const updateProjects = async () => {
            setChannels(ress);
          };
          await updateProjects();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchChannels();
  }, [user, search]);

  return (
    <>
      <Navbar />
      <div className={allchnlcss.row1}>
        <input
          className={allchnlcss.searchBar}
          type="text"
          placeholder="Search Channels..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <a href="/createchannel">
          <button className={allchnlcss.createButton}>Create Channel</button>
        </a>
      </div>
      <div className={allchnlcss.row2}>
        {/* List of channel cards */}
        {channel.map((channel) => (
          <ChannelCard
            key={channel._id}
            keys={channel._id}
            name={channel.title}
            description={channel.description}
            tags={channel.tags}
            joinedCount={channel.join.length}
            onJoin={channel.join}
            user={user}
          />
        ))}
      </div>
    </>
  );
}

export default Allchannels;
