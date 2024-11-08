import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo or Brand Name */}
        <div className="footer-brand">
          <h2>MalFriAnn</h2>
          <p>För starkare dagar</p>
        </div>



        <div className="footer-contact">
          <h3> Kontakta oss</h3>
          <p>Email: MalFriAnn@gym.com</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Följ oss på:</h3>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MalFriAnn. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
