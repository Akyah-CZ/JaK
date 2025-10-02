function Footer() {
    const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {year} JAK na účto s.r.o.</p>
      </div>
    </footer>
  );
}

export default Footer;