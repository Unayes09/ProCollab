import React, { useState,useEffect } from 'react';
import {  AiOutlineCloseCircle } from 'react-icons/ai'; // Import add and remove icons from react-icons

import CreateProjectCss from './CreateProject.module.css'; // Import your CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  let user;
  const navigate = useNavigate()
  function routetoproject(){
    navigate('/homepage')
  }
  function routetohome(){
    navigate('/login')
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
              setProjectData({ ...projectData, project_holder: user })
          })
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    checkUsername();
}, []);

  const [projectData, setProjectData] = useState({
    project_holder: '',
    title: '',
    subject: '',
    tags: [],
    photos: [],
    description: '',
    shareable_links: '',
  });

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
    if (!projectData.tags.includes(selectedTag)) {
      setProjectData({ ...projectData, tags: [...projectData.tags, selectedTag] });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProjectData({ ...projectData, tags: projectData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handlePhotoChange = async (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
        const fileArray = Array.from(selectedFiles);
        const base64Array = [];
        await Promise.all(fileArray.map(async (file) => {
            const photos = new FormData();
            photos.append("image", file);
            const response = await fetch('https://api.imgbb.com/1/upload?key=fc85d77221544f26553516a9bfd4a285', {
                method: "POST",
                body: photos
            });
            const data = await response.json();
            console.log(data.data.url);
            base64Array.push(data.data.url);
        }));
        setProjectData({ ...projectData, photos: [...projectData.photos, ...base64Array] });
    }
};


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        let jsonData = "";
        await fetch('http://localhost:8000/auth/createProject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)

        })
        .then(async response => {
          const data = await response.json()
         
            routetoproject()
        })
      } catch (error) {
          console.error('Error submitting form:', error);
    }
    console.log(JSON.stringify(projectData));
  };

  return (
    <>
    <Navbar/>

      <div className={CreateProjectCss.wrapper}>
        <div className={CreateProjectCss.createprojectbox}>
        <h2>Create a New Project</h2>
          

          <div className={CreateProjectCss.inputgroup}>
          <label>Title</label>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
          />
        </div>

          <div className={CreateProjectCss.inputgroup}>
          <label>Subject</label>
          <input
            type="text"
            value={projectData.subject}
            onChange={(e) => setProjectData({ ...projectData, subject: e.target.value })}
          />
        </div>

        <div className={CreateProjectCss.inputgroup}>
          <label>Tags</label>
          <select onChange={(e) => handleTagChange(e.target.value)}>
            <option value="">Select Tag</option>
            {tagOptions.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
            <div className={CreateProjectCss.tags}>
            {projectData.tags.map((tag, index) => (
              <div key={index} className={CreateProjectCss.tag}>
                {tag}
                <AiOutlineCloseCircle className={CreateProjectCss.removeicon} onClick={() => handleRemoveTag(tag)} />
              </div>
            ))}
          </div>
         
        </div>

          <div className={CreateProjectCss.inputgroup}>
          <label>Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            multiple
            onChange={handlePhotoChange}
          />
            <div className={CreateProjectCss.photos}>
              {projectData.photos.map((photo, index) => (
                <div key={index} className={CreateProjectCss.photo}>
                <img src={photo} alt={`Photo ${index}`} />
              </div>
            ))}
          </div>
        </div>

          <div className={CreateProjectCss.inputgroup}>
          <label>Description</label>
          <textarea
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          />
        </div>

          <div className={CreateProjectCss.inputgroup}>
          <label>Shareable Links</label>
          <input
            type="text"
            value={projectData.shareable_links}
            onChange={(e) => setProjectData({ ...projectData, shareable_links: e.target.value })}
          />
        </div>

          <button className={CreateProjectCss.createbutton} onClick={handleSubmit}>
          Create Project
        </button>
      </div>
      </div>
      </>
  );
};

export default CreateProject;
