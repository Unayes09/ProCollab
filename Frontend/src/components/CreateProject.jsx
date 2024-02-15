import React, { useState } from 'react';
import {  AiOutlineCloseCircle } from 'react-icons/ai'; // Import add and remove icons from react-icons

import './CreateProject.css'; // Import your CSS file
import Navbar from './Navbar';

const CreateProject = () => {
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

  const handlePhotoChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
      setProjectData({ ...projectData, photos: [...projectData.photos, ...fileArray] });
    }
  };

  const handleSubmit = () => {
    // Send projectData to the backend
    console.log(JSON.stringify(projectData));
    // Reset the form or redirect to another page
  };

  return (
    <>
    <Navbar/>

    <div className="wrapper">
      <div className="create-project-box">
        <h2>Create a New Project</h2>
        <div className="input-group">
          <label>Project Holder</label>
          <input
            type="text"
            value={projectData.project_holder}
            onChange={(e) => setProjectData({ ...projectData, project_holder: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Subject</label>
          <input
            type="text"
            value={projectData.subject}
            onChange={(e) => setProjectData({ ...projectData, subject: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Tags</label>
          <select onChange={(e) => handleTagChange(e.target.value)}>
            <option value="">Select Tag</option>
            {tagOptions.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className="tags">
            {projectData.tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <AiOutlineCloseCircle className="remove-icon" onClick={() => handleRemoveTag(tag)} />
              </div>
            ))}
          </div>
         
        </div>

        <div className="input-group">
          <label>Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
          <div className="photos">
            {projectData.photos.map((photo, index) => (
              <div key={index} className="photo">
                <img src={photo} alt={`Photo ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            value={projectData.description}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Shareable Links</label>
          <input
            type="text"
            value={projectData.shareable_links}
            onChange={(e) => setProjectData({ ...projectData, shareable_links: e.target.value })}
          />
        </div>

        <button className="create-button" onClick={handleSubmit}>
          Create Project
        </button>
      </div>
      </div>
      </>
  );
};

export default CreateProject;
