import React, { useState, useEffect } from 'react';
import ChangePasswordCss from './ChangePassword.module.css'





const ChangePassword = () => {

   
    const [UsernameData, setUsername] = useState()
    const [OldPasswordData, setOldPassword] = useState()
    const [NewPasswordData, setNewPassword] = useState()

    const [OldError, setOldError] = useState(false);
    const [ChangeDone, setChangeDone] = useState(false);



    useEffect(() => {
        console.log('Form data changed:', UsernameData);
    }, [UsernameData]);

    useEffect(() => {
        console.log('Form data changed:', OldPasswordData);
    }, [OldPasswordData]);
    useEffect(() => {
        console.log('Form data changed:', NewPasswordData);
    }, [NewPasswordData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                username: UsernameData,
                old_password: OldPasswordData,
                new_password: NewPasswordData
            }
            let jsonData = "";
            await fetch('http://localhost:8000/auth/changePass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            .then(async response => {
                const data = await response.json()
                if (response.status===200) {
                    setChangeDone(true);
                    console.log(response.status)
                }
                else if (response.status===401) {
                    setOldError(true);
                    console.log(response.status)
                }

                
            })
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <>
            <div className={ChangePasswordCss.mainroot}>
            
            <div className={ChangePasswordCss.wrapper}>
                <form onSubmit={handleSubmit}>
                        <h1>Change Password</h1>
                        {OldError &&<div className={ChangePasswordCss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                Old Password Worng!
                            </p>
                        </div>}
                         {ChangeDone &&<div className={ChangePasswordCss.additionalText}>
                            <p style={{ color: 'red', fontSize: '12px', marginTop:'40px' }}>
                                Password Changed.
                            </p>
                        </div>}

                    <div className={ChangePasswordCss.inputbox}>
                        <input type="text" placeholder='Username' required name="Username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={ChangePasswordCss.inputbox}>
                        <input type="password" placeholder='Old Password' required onChange={(e) => setOldPassword(e.target.value)} />    
                    </div>
                    <div className={ChangePasswordCss.inputbox}>
                        <input type="password" placeholder='New Password' required onChange={(e) => setNewPassword(e.target.value)} />    
                        </div>
                        
                    <button type="submit" onClick={handleSubmit}>Change</button>
                   
                </form>

            </div>
            </div>
        </>
    );
}

export default ChangePassword;