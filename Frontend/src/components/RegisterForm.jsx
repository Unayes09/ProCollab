import React, { useState, useEffect } from 'react';
import './RegisterForm.css'

// import { FaRegUserCircle } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";

const RegisterForm = () => {

        const [nameData, setname] = useState()
        const [UsernameData, setUsername] = useState()
        const [EmailData, setEmail] = useState()
        const [PasswordData,setPassword]=useState()
        const [ConfirmPasswordData, setConfirmPassword] = useState()
    

    
        // State to keep track of checked items
        const [checkedItems, setCheckedItems] = useState({});

        // Dummy data for checkboxes
        const checkboxData = [
            { id: 1, label: 'Option 1' },
            { id: 2, label: 'Option 2' },
            { id: 3, label: 'Option 3' },
        ];

        // Function to handle checkbox change
        const handleCheckboxChange = (id) => {
            setCheckedItems((prevCheckedItems) => ({
                ...prevCheckedItems,
                [id]: !prevCheckedItems[id],
            }));
        };
        useEffect(() => {
            console.log('Form data changed:', nameData);
        }, [nameData]);
        useEffect(() => {
            console.log('Form data changed:', UsernameData);
        }, [UsernameData]);
    
        useEffect(() => {
            console.log('Form data changed:', EmailData);
        }, [EmailData]);
    
        useEffect(() => {
            console.log('Form data changed:', PasswordData);
        }, [PasswordData]);
        useEffect(() => {
            console.log('Form data changed:', ConfirmPasswordData);
        }, [ConfirmPasswordData]);
    
        const handleSubmit = async (e) => {
            e.preventDefault();

            if (PasswordData != ConfirmPasswordData) {
                alert("Password not matching")
            }

            // Get checked items as an array
    const selectedItems = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    // Convert the array to a string to send to the backend
    const selectedItemsString = selectedItems.join(',');

    // Send the selected items to the backend (replace with your actual backend API call)
    // Example: fetch('/api/submitCheckedItems', { method: 'POST', body: selectedItemsString });

    console.log('Selected Items:', selectedItemsString);

            try {
                //console.log('Form data submitted:', formData);
                const formData = {
                    name:nameData,
                    username: UsernameData,
                    email: EmailData,
                    password: PasswordData
                }
                let jsonData = "";
                const response = await fetch('http://localhost:8000/auth/register', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                    
                });
                jsonData = await response.json()
                if (response.ok) {
                    console.log(jsonData)
                } else {
                    console.log(jsonData)
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };


        return (
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Registeration Form</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Fullname' required name="Fullname" onChange={(e)=>setname(e.target.value)}/>
                        
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required name="Username" onChange={(e)=>setUsername(e.target.value)}/>
                        
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Email' required name="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} /> 
                    </div>

                     <div className="input-box">
                        <input type="password" placeholder='Confirm Password' required onChange={(e) => setConfirmPassword(e.target.value)} /> 
                    </div>


                     {checkboxData.map((checkbox) => (
                        <div key={checkbox.id}>
                             <label>
                             <input
                                  type="checkbox"
                                 checked={checkedItems[checkbox.id] || false}
                                onChange={() => handleCheckboxChange(checkbox.id)}
                                 />
                            {checkbox.label}
                             </label>
                        </div>
                        ))}


                    
                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already Have an account? <a href='/'>Login</a></p>
                    </div>
                </form>
           
            </div>
        );
    }

export default RegisterForm;