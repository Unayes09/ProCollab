import React, { useState,useEffect } from 'react';
import {  AiOutlineCloseCircle } from 'react-icons/ai'; // Import add and remove icons from react-icons

import CreateChannelCss from './CreateChannel.module.css'; // Import your CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const CreateChannel = () => {
  let user;
  const navigate = useNavigate()
  function routetoproject(){
    navigate('/homepage')
  }
  function routetohome(){
    navigate('/signin')
    }
    
  const [ChannelData, setChannelData] = useState({
    channel_holder: '',
    title: '',
    tags: [],
    description: '',
  });

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
          if (!response.ok) {
              routetohome()
          }
      } catch (error) {
          console.error('Error checking login status:', error);
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
              setChannelData({ ...ChannelData, channel_holder: user })
          })
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    checkUsername();
}, []);


  const tagOptions = [
    'Programming Languages',
    'Web Development',
    'Data Structures and Algorithms',
    'Artificial Intelligence and Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Internet of Things (IoT)',
    'Mobile App Development',
    'Software Engineering',
    'Data Science',
    'DevOps',
    'Robotics',
    'Game Development',
    'Quantum Computing',
    'Emerging Technologies',
  ];


  const handleTagChange = (selectedTag) => {
    if (!ChannelData.tags.includes(selectedTag)) {
      setChannelData({ ...ChannelData, tags: [...ChannelData.tags, selectedTag] });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setChannelData({ ...ChannelData, tags: ChannelData.tags.filter(tag => tag !== tagToRemove) });
  };

  

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
       
        await fetch('http://localhost:8000/auth/createChannel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ChannelData)

        })
        .then(async response => {
            const data = await response.json()
            if (response.status === 200) {
                console.log(response.status)
                routetoproject()
                
            }
            
        })
      } catch (error) {
          console.error('Error submitting form:', error);
    }
    console.log(JSON.stringify(ChannelData));
  };

  return (
    <>
    <Navbar/>

      <div className={CreateChannelCss.wrapper}>
        <div className={CreateChannelCss.createprojectbox}>
        <h2>Create a New Channel</h2>
          

          <div className={CreateChannelCss.inputgroup}>
          <label>Title</label>
          <input
            type="text"
            value={ChannelData.title}
            onChange={(e) => setChannelData({ ...ChannelData, title: e.target.value })}
          />
        </div>

        <div className={CreateChannelCss.inputgroup}>
          <label>Tags</label>
          <select onChange={(e) => handleTagChange(e.target.value)}>
            <option value="">Select Tag</option>
            {tagOptions.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
                      </select>
                      
            <div className={CreateChannelCss.tags}>
            {ChannelData.tags.map((tag, index) => (
              <div key={index} className={CreateChannelCss.tag}>
                {tag}
                <AiOutlineCloseCircle className={CreateChannelCss.removeicon} onClick={() => handleRemoveTag(tag)} />
              </div>
            ))}
          </div>
         
        </div>

        <div className={CreateChannelCss.inputgroup}>
          <label>Description</label>
          <textarea
            value={ChannelData.description}
            onChange={(e) => setChannelData({ ...ChannelData, description: e.target.value })}
          />
        </div>

         

          <button className={CreateChannelCss.createbutton} onClick={handleSubmit}>
          Create Channel
        </button>
      </div>
      </div>
      </>
  );
};

export default CreateChannel;
