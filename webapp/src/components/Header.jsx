import {Link, useLocation} from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">MyApp</Link>
                </div>
                <nav className="nav">
                    <Link
                        to="/services"
                        className={(location.pathname === '/services' || location.pathname === '/') ? 'nav-link active' : 'nav-link'}
                    >
                        Sluzby
                    </Link>
                    <Link
                        to="/about"
                        className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
                    >
                        O nas
                    </Link>
                    <Link
                        to="/prices"
                        className={location.pathname === '/prices' ? 'nav-link active' : 'nav-link'}
                    >
                        Cenik
                    </Link>
                    <Link
                        to="/contact"
                        className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
                    >
                        Kontakt
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
