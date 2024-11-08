import './NavbarComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function NavbarComponent() {

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/about"><i className="fas fa-clock"></i> Öppettider</Link></li>
            <li><Link to="/settings"><i className="fas fa-cog"></i> Inställningar</Link></li>  
            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Logga In</Link></li>       
            <li className="dropdown">
              <button className="dropbtn"><i className="fas fa-user-plus"></i> Bli Medlem</button>
              <ul className="dropdown-content">
                <li><Link to="/registration"><i className="fas fa-user-edit"></i> Registrering</Link></li>
                <li><Link to="/gyminfo"><i className="fas fa-info-circle"></i> Info - Medlemskap</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;