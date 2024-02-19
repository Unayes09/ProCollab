import React, { useState, useEffect } from "react";
import homecss from "./Home.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ keys, owner, name, description, imageUrl, tags }) => {
  //console.log(key+owner+name+description)
  return (
    <div className={homecss.projectCard}>
      {/* Left Section */}
      <div className={homecss.textSection}>
        <h4>{owner}</h4>
        <h1>{name}</h1>
        <p>{description}</p>
        <div className={homecss.tagsSection}>
          {tags &&
            tags.map((tag, index) => (
              <span key={index} className={homecss.tag}>
                {tag}
              </span>
            ))}
        </div>
        <a href={"projectpage?id=" + keys}>
          <button className={homecss.see_more}>See More</button>
        </a>
      </div>

      {/* Right Section */}
      <div className={homecss.imageSection}>
        <img src={imageUrl} alt="Project" />
      </div>
    </div>
  );
};

function Home() {
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

  const [projects, setProjects] = useState([]);
  const [channel, setChannels] = useState([]);
  const [FeedBackData, setFeedBack] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchProjects = async () => {
      try {
        let response;
        if (search == "") {
          response = await fetch("https://procollab-backends.onrender.com/api/projects", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          response = await fetch(
            "https://procollab-backends.onrender.com/api/search?word=" + search,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        const ress = await response.json();
        //setProjects(ress)
        if (response.ok) {
          const updateProjects = async () => {
            setProjects(ress);
            console.log(ress);
          };
          await updateProjects();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [search, user]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://procollab-backends.onrender.com/api/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const ress = await response.json();
        //setProjects(ress)
        if (response.ok) {
          const updateProjects = async () => {
            setProjects(ress);
          };
          await updateProjects();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    //console.log(projects[0]);
    fetchProjects();
  }, [user]);

  useEffect(() => {
    // Fetch projects from the server when the component mounts
    if (!user) return;
    const fetchChannels = async () => {
      try {
        console.log(user);
        const response = await fetch(
          "https://procollab-backends.onrender.com/api/channels?user=" + user,
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
            setChannels(ress);
          };
          await updateProjects();
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchChannels();
  }, [user]);

  useEffect(() => {
    console.log("Form data changed:", FeedBackData);
  }, [FeedBackData]);

  const handleFeedBack = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        username: user,
        feedback: FeedBackData,
      };
      let jsonData = "";
      await fetch("https://procollab-backends.onrender.com/auth/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className={homecss.mainroot}>
        <Navbar />
        <main className={homecss.maincontent}>
          <div className={homecss.leftsection1}>
            <h2 className={homecss.header}>My Channels</h2>
            <hr className={homecss.horizontalRow} />
            <ul className={homecss.channelList}>
              {channel.map((channel) => (
                <li key={channel._id}>
                  <a href={"chatbox?id=" + channel._id}>
                    {channel.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={homecss.leftsection2}>
            <textarea
              placeholder="Enter your feedback"
              className={homecss.feedbackTextarea}
              required
              onChange={(e) => setFeedBack(e.target.value)}
            ></textarea>
            {/* Submit button with adjusted width */}
            <button className={homecss.submitButton} onClick={handleFeedBack}>
              Submit
            </button>
          </div>
          <div className={homecss.rightsection1}>
            {/* Search Bar with Search Icon */}
            <div className={homecss.searchContainer}>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className={homecss.searchBar}
              />
            </div>
            <button className={homecss.createButton}>
              <a href="/createproject" className={homecss.createButton}>
                Create
              </a>
            </button>
          </div>
          <div className={homecss.rightsection2}>
            {/* List of Cards */}
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                keys={project._id}
                owner={project.project_holder}
                name={project.title}
                description={project.subject}
                imageUrl={project.photos[0]}
                tags={project.tags}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;
