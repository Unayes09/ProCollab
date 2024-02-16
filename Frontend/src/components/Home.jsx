import React, { useState, useEffect } from 'react';
import homecss from './Home.module.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const tags = ['Web Development', 'React', 'JavaScript', 'Frontend', 'UI/UX', 'Web Development', 'React', 'JavaScript', 'Frontend', 'UI/UX',
    'Web Development', 'React', 'JavaScript', 'Frontend', 'UI/UX', 'Web Development', 'React', 'JavaScript', 'Frontend', 'UI/UX'];


const ProjectCard = ({ owner, name, description, imageUrl }) => {
    return (
        <div className={homecss.projectCard}>
            {/* Left Section */}
            <div className={homecss.textSection}>
                <h4>{owner}</h4>
                <h1>{name}</h1>
                <p>{description}</p>
                <div className={homecss.tagsSection}>
                    {tags && tags.map((tag, index) => (
                        <span key={index} className={homecss.tag}>{tag}</span>
                    ))}
                </div>
                <button className={homecss.see_more}>See More</button>
                
            </div>

            {/* Right Section */}
            <div className={homecss.imageSection}>
                <img src={imageUrl} alt="Project" />
            </div>
        </div>
    );
};

function Home() {
    const navigate = useNavigate()
    let [user, setUser] = useState();
    function routetohome(){
        navigate('/signin')
    }
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8000/api/verify/'+token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
    
                });
                if (response.ok) {
                    
                }
            } catch (error) {
                routetohome()
            }
        };
    
        checkLoggedIn();
    }, []);
    useEffect(() => {
        const checkUsername = async () => {
            try {
                const token = localStorage.getItem('token')
                await fetch('http://localhost:8000/api/username/'+token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
    
                })
                .then(async response => {
                  const data = await response.json()
                  user = data.username
                  setUser(data.username)
              })
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
    
        checkUsername();
    }, []);
    
    const [projects, setProjects] = useState([]);
    const [channel, setChannels] = useState([]);
    const [FeedBackData, setFeedBack] = useState();
    const [search, setSearch] = useState();
    
    useEffect(() => {
        const fetchProjects = async () => { 
        try {
            let response;
            if(search==""){
                response = await fetch('http://localhost:8000/api/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
            }
            else{
                response = await fetch('http://localhost:8000/api/search?word='+search, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
            }
            const ress = await response.json()
            //setProjects(ress)
            if (response.ok) {
                const updateProjects = async () => {
                    setProjects(ress)
                    //console.log(ress)
                }
                await updateProjects();
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    fetchProjects();
        
    }, [search]);
    
    useEffect(() => {
        // Fetch projects from the server when the component mounts

        

        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
    
                });
                const ress = await response.json()
                //setProjects(ress)
                if (response.ok) {
                    const updateProjects = async () => {
                        setProjects(ress)
                        //console.log(projects)
                    }
                    await updateProjects();
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        //console.log(projects[0]);
        fetchProjects();
    }, []);

    useEffect(() => {
        // Fetch projects from the server when the component mounts
        const fetchChannels = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/channels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
    
                });
                const ress = await response.json()
                //setProjects(ress)
                if (response.ok) {
                    const updateProjects = async () => {
                        setChannels(ress)
                    }
                    await updateProjects();
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchChannels();
    }, []);

    useEffect(() => {
        console.log('Form data changed:', FeedBackData);
    }, [FeedBackData]);


    const handleFeedBack = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                username: user,
                feedback: FeedBackData
            }
            let jsonData = "";
            await fetch('http://localhost:8000/auth/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
        } catch (error) {
            console.error('Error submitting form:', error);
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
                                <a href ={"http://localhost:5173/chatbox?id="+channel._id} >{channel.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={homecss.leftsection2}>
                        <textarea
                            placeholder="Enter your feedback"
                            className={homecss.feedbackTextarea}
                            required onChange={(e) => setFeedBack(e.target.value)}
                        ></textarea>
                        {/* Submit button with adjusted width */}
                        <button className={homecss.submitButton} onClick={handleFeedBack}>Submit</button>
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
                        <button className={homecss.createButton}><a href='/createproject' className={homecss.createButton}>Create</a></button>
                        
                    </div>
                    <div className={homecss.rightsection2}>
                        {/* List of Cards */}
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                owner={project.project_holder}
                                name={project.title}
                                description={project.subject}
                                imageUrl={project.photos[0]}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
