import React, { useState, useEffect } from 'react';
import profilecss from './ProfilePage.module.css'
import Navbar from './Navbar';
import { FaLock, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const tags = ['React', 'JavaScript', 'CSS', 'Node.js', 'Express', 'MongoDB'];



const ProjectCard = ({ keys, owner, title, description, imageUrl, tags }) => {
    //console.log(key+owner+name+description)
    return (
        <div className={profilecss.projectCard}>
            {/* Left Section */}
            <div className={profilecss.textSection}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={profilecss.tagsSection}>
                    {tags && tags.map((tag, index) => (
                        <span key={index} className={profilecss.tag}>{tag}</span>
                    ))}
                </div>
                <a href="#">
                    <button className={profilecss.see_more}>
                        See More 
                    </button>
                    
                </a>

            </div>

            {/* Right Section */}
            <div className={profilecss.imageSection}>
                <img src={imageUrl} alt="Project" />
            </div>
        </div>
    );
};

const Profilepage = () => {
    const navigate = useNavigate()
    let [user, setUser] = useState();
    function routetohome() {
        navigate('/signin')
    }
    const onChangePassword=async()=> {
        navigate('/changepassword')
    }
    const onSignout = async () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8000/api/verify/' + token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
                if (response.ok) {

                }
                else {
                    routetohome()
                }
            } catch (error) {

            }
        };

        checkLoggedIn();
    }, []);
    
    useEffect(() => {
        const checkUsername = async () => {
            try {
                const token = localStorage.getItem('token')
                await fetch('http://localhost:8000/api/username/' + token, {
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

    const [Myprojects, setMyprojects] = useState([]);

    useEffect(() => {
        if (!user) return;
        const fetchMyProjects = async () => {
            try {
                await fetch('http://localhost:8000/api/projects?user=' + user, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                })
                .then(async response => {
                    const data = await response.json()
                    const updateProjects = async () => {
                        setMyprojects(data)
                    }
                    await updateProjects();
                })
            } catch (error) {
                console.error('Error fetching Myprojects:', error);
            }
        };
        fetchMyProjects();

    }, [user]);

    const [userData, setuserData] = useState([]);

    useEffect(() => {
        if (!user) return;
        const fetchuserData = async () => {
            try {
                await fetch('http://localhost:8000/api/user?username='+user, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                })
                    .then(async response => {
                        const data = await response.json()
                        const updateuserData = async () => {
                            setuserData(data)
                        }
                        await updateuserData();
                        console.log(userData)
                    })
                .catch(err=>console.log(err))
            } catch (error) {
                console.error('Error fetching userData:', error);
            }
        };
        fetchuserData();

    }, [user]);



    return (
        <>
            <div className={profilecss.mainroot}>
                <Navbar />
                <div className={profilecss.profilesection}>
                    <div className={profilecss.leftsection}>
                        <div className={profilecss.accountinfo}>
                            <h1 style={{ textAlign: 'center' }} >Account Info</h1>
                            <hr className={profilecss.horizontalRow} />
                            <h2 className={profilecss.fullname}>Name : {userData.name}</h2>
                            <p className={profilecss.normaltext}>Username : {userData.username}</p>
                            <p className={profilecss.normaltext}>Email : {userData.email}</p>
                                <span className={profilecss.normaltext}>My Interest  : </span>
                                <div className={profilecss.tagList}>
                                {userData.interests && userData.interests.map((tag, index) => (
                                    <span key={index} className={profilecss.tag}>
                                        {tag}
                                    </span>
                                ))}
                                </div>

                        </div>


                        <button className={profilecss.forgetpassword} onClick={onChangePassword}>
                            <FaLock className={profilecss.icon} />
                            Change Password
                        </button>

                        <button className={profilecss.signout} onClick={onSignout}>
                            <FaSignOutAlt className={profilecss.icon} />
                            Sign Out
                        </button>
                    </div>
                    <div className={profilecss.rightsection}>   
                        <div className={profilecss.projectlist}>    
                            <div className={profilecss.myprojects}>
                                {Myprojects.map((project) => (
                                    <ProjectCard
                                    key={project.keys}
                                    owner={project.owner}
                                    title={project.title}
                                    description={project.subject}
                                    imageUrl={project.photos}
                                    tags={project.tags} 
                                    />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Profilepage;