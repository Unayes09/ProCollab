import navbar from './Navbar.module.css'

function Navbar() {
    return (
        <>
            <nav className={navbar.navbar}>
                <div className={navbar.navbarleft}>
                    <span className={navbar.logo}></span>
                </div>
                <div className={navbar.navbarright}>

                    <a href="/instraction">Instraction</a>
                    <a href="/channels">Channels</a>
                    <a href="/about">About</a>
                    <a href="/signin">Sign in</a>
                    
                </div>
            </nav>

        </>
    )
}

export default Navbar