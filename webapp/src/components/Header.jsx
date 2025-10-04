import {Link, useLocation} from 'react-router-dom';

function Header() {
    const location = useLocation();


    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" aria-label="JAK home">
                        <img src={"./logo_ai.png"} alt="JAK" className="logo-img" />
                    </Link>
                </div>
                <nav className="nav">
                    <Link
                        to="/services"
                        className={(location.pathname === '/services' || location.pathname === '/') ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-cog" aria-hidden="true"></i>
                        <span>Služby</span>
                    </Link>
                    <Link
                        to="/pricing"
                        className={location.pathname === '/pricing' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-tags" aria-hidden="true"></i>
                        <span>Ceník</span>
                    </Link>
                    <Link
                        to="/contact"
                        className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-envelope" aria-hidden="true"></i>
                        <span>Kontakt</span>
                    </Link>
                    <Link
                        to="/about"
                        className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-info-circle" aria-hidden="true"></i>
                        <span>O nás</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
