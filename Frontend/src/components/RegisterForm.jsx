import React, { useState, useEffect } from 'react';
import registercss from './RegisterForm.module.css'
import {  AiOutlineCloseCircle } from 'react-icons/ai'; // Import add and remove icons from react-icons
import { useNavigate } from 'react-router-dom';
// import { FaRegUserCircle } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

const RegisterForm = () => {

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
                console.log(token)
                const response = await fetch('http://localhost:8000/api/verify/'+token, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }

                });
                if (response.ok) {
                    routetoproject()
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoggedIn();
    }, []);

    const [RegisterData, setRegisterData] = useState({
   
    name: '',
    username: '',
    email: [],
    password: [],
    interests: [],
    
        });
    
    const [registerdone, setregisterdone] = useState(false);
    const [registerfail1, setregisterfil1] = useState(false);
    const [registerfail2, setregisterfail2] = useState(false);

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
    if (!RegisterData.interests.includes(selectedTag)) {
      setRegisterData({ ...RegisterData, interests: [...RegisterData.interests, selectedTag] });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setRegisterData({ ...RegisterData, interests: RegisterData.interests.filter(tag => tag !== tagToRemove) });
  };
      
       
    // Convert the array to a string to send to the backend
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        
        await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RegisterData)

        })
        .then(async response => {
            const data = await response.json()
            if (response.ok) {
                setregisterdone(true)
            }
            else if (response.status === 400){
                setregisterfil1(true)
            }
            else if (response.status === 401) {
                setregisterfail2(true)
            }
            console.log(data)
           
        })
      } catch (error) {
          console.error('Error submitting form:', error);
    }
    console.log(JSON.stringify(RegisterData));
  };


    return (
        <>
            <div className={registercss.mainroot}>
                <div className={registercss.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h1>Registeration Form</h1>
                        <div className={registercss.inputbox}>
                        <input type="text" placeholder='Name' required value={RegisterData.name} onChange={(e)=> setRegisterData({ ...RegisterData, name: e.target.value })}/>
                        
                    </div>
                        <div className={registercss.inputbox}>
                        <input type="text" placeholder='Username' required value={RegisterData.username} onChange={(e)=>setRegisterData({ ...RegisterData, username: e.target.value })}/>
                        
                    </div>
                        <div className={registercss.inputbox}>
                        <input type="email" placeholder='Email' required value={RegisterData.email} onChange={(e)=>setRegisterData({ ...RegisterData, email: e.target.value })}/>
                        
                    </div>

                        <div className={registercss.inputbox}>
                        <input type="password" placeholder='Password' required value={RegisterData.password} onChange={(e) => setRegisterData({ ...RegisterData, password: e.target.value })} /> 
                    </div>

                        


                     <div className={registercss.inputgroup}>
                            <label>Tags</label>
                            <select onChange={(e) => handleTagChange(e.target.value)}>
                             <option value="">Select Tag</option>
                    {tagOptions.map((tag, index) => (
                    <option key={index} value={tag}>
                            {tag}
                        </option>
            ))}
                            </select>
                            
            <div className={registercss.tags}>
            {RegisterData.interests.map((tag, index) => (
              <div key={index} className={registercss.tag}>
                {tag}
                <AiOutlineCloseCircle className={registercss.removeicon} onClick={() => handleRemoveTag(tag)} />
              </div>
            ))}
          </div>
         
        </div>

                    
                        <button type="submit" onClick={handleSubmit}>Register</button>
                        
                        {registerdone &&<div className={registercss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                Please check your email.
                            </p>
                        </div>}
                        {registerfail1 &&<div className={registercss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                Email or username already registered!
                            </p>
                        </div>}
                        {registerfail2 &&<div className={registercss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                               Username should be a single word!
                            </p>
                        </div>}


                        <div className={registercss.registerlink}>
                        <p>Already Have an account? <a href='/signin'>Login</a></p>
                    </div>
                </form>
           
            </div>
            </div>
        </>
        );
    }

export default RegisterForm;