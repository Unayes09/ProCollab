import navbar from './Navbar.module.css'

function Navbar() {
    return (
        <>
            <nav className={navbar.navbar}>
                <div className={navbar.navbarleft}>
                    <span className="logo"></span>
                </div>
                <div className={navbar.navbarright}>
                    <a href="/">Sign in</a>
                    <a href="#about">About</a>
                    <a href="/channels">Channels</a>
                    <a href="/profiles">Projects</a>
                </div>
            </nav>

        </>
    )
}

export default Navbar