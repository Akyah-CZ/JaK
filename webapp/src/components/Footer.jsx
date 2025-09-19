import { useTexts } from '../hooks/useTexts.jsx';

function Footer() {
    const year = new Date().getFullYear();
    const { getText } = useTexts();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {year} {getText('company.name')}</p>
      </div>
    </footer>
  );
}

export default Footer;