import React from 'react';
import Profilecss from './ProfilePage.module.css'
import Profile1 from '../assets/projectphoto.jpg'
import Profile2 from '../assets/projectphoto2.jpeg'
import Navbar from './Navbar';
const ProfilePage = () => {


    return (
        <>
            <div className={Profilecss.Navbar}>  <Navbar/> </div> 
        <div className={Profilecss.container}>
            <div className={Profilecss.NameAndShort}>
                <h3>Name of Project</h3>
                <p>short description here</p>
            </div>
            <div className={Profilecss.Description}> 
                <p>Description</p>
            </div>
            <div className={Profilecss.Photos}>
                <img src={Profile1} width={300} height={300}/><br/>
                <img src={ Profile2} width={300} height={300}/>
            </div>






            </div>
            </>
    );
};

export default ProfilePage;