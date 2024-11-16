import { useState } from 'react';
import './NavbarComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../logIn/LoginModal';

function NavbarComponent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lägg till eventuell ytterligare utloggningslogik här, t.ex. rensa token från localStorage
    window.alert('Nu är utloggad från ditt konto');
    navigate('/'); // Navigera till startsidan
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/about"><i className="fas fa-clock"></i> Öppettider</Link></li>
            <li><Link to="/settings"><i className="fas fa-cog"></i> Inställningar</Link></li>  
            {!isLoggedIn && (
              <>
                <li><button className="loginbtn" onClick={openLoginModal}><i className="fas fa-sign-in-alt"></i> Logga In</button></li>
                <li className="dropdown">
                  <button className="dropbtn"><i className="fas fa-user-plus"></i> Bli Medlem </button>
                  <ul className="dropdown-content">
                    <li><Link to="/registration"><i className="fas fa-user-edit"></i> Registrering</Link></li>
                    <li><Link to="/gyminfo"><i className="fas fa-info-circle"></i> Info - Medlemskap</Link></li>
                  </ul>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li><Link to="/myaccount"><i className="fas fa-user"></i> My Account</Link></li>
                <li><Link to="/notes"><i className="fas fa-notes"></i> My notes</Link></li>
                <li><button className="logoutbtn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logga Ut</button></li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default NavbarComponent;