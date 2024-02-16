import navbar from './Navbar.module.css'

function Navbar() {
    return (
        <>
            
            <nav className={navbar.navbar}>
                <div className={navbar.navbarleft}>
                    <span className={navbar.logo}></span>
                </div>
                <div className={navbar.navbarright}>


                    <a href="/homepage">Profile</a>
                    <a href="/resources">Resources</a>
                    <a href="/channels">Channels</a>
                    <a href="/Project">Projects</a>

                </div>
            </nav>

        </>
    )
}



export default Navbar