import {Link, useLocation} from 'react-router-dom';
import { useTexts } from '../hooks/useTexts.jsx';

function Header() {
    const location = useLocation();
    const { getText } = useTexts();


    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" aria-label="JaK home">
                        <img src={`${import.meta.env.BASE_URL}vite.svg`} alt="JaK" className="logo-img" />
                    </Link>
                </div>
                <nav className="nav">
                    <Link
                        to="/services"
                        className={(location.pathname === '/services' || location.pathname === '/') ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-cog" aria-hidden="true"></i>
                        <span>{getText('navigation.service')}</span>
                    </Link>
                    <Link
                        to="/pricing"
                        className={location.pathname === '/pricing' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-tags" aria-hidden="true"></i>
                        <span>{getText('navigation.pricing')}</span>
                    </Link>
                    <Link
                        to="/contact"
                        className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-envelope" aria-hidden="true"></i>
                        <span>{getText('navigation.contact')}</span>
                    </Link>
                    <Link
                        to="/about"
                        className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
                    >
                        <i className="pi pi-info-circle" aria-hidden="true"></i>
                        <span>{getText('navigation.about')}</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
