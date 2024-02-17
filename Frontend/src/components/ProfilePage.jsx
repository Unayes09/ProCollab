import profilecss from './ProfilePage.module.css'
import Navbar from './Navbar';
import dp from '/sq4.jpg'

const Profilepage = () => {


    return (
        <>
            <div className={profilecss.mainroot}>
                <Navbar />
                <div className={profilecss.profilesection}>
                    <div className={profilecss.leftsection}>
                        <img src={dp} alt="hi" className={ profilecss.dp} />
                        <span className={profilecss.username}>User name</span>
                    </div>
                    <div className={profilecss.rightsection1}>
                        hello
                    </div>
                    <div className={profilecss.rightsection2}>
                            hay
                    </div>
                </div>

            </div>
        </>
    );
};

export default Profilepage;