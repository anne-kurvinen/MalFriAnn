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
            <li><Link to="/om-oss"><i className="fas fa-clock"></i> Öppettider</Link></li>
            <li><Link to="/installningar"><i className="fas fa-cog"></i> Inställningar</Link></li>  
            <li><Link to="/inlogg"><i className="fas fa-sign-in-alt"></i> Logga In</Link></li>       
            <li className="dropdown">
              <button className="dropdown-btn"><i className="fas fa-user-plus"></i> Bli Medlem</button>
              <ul className="dropdown-menu">
                <li><Link to="/registration"><i className="fas fa-user-edit"></i> Registrering</Link></li>
                <li><Link to="/info"><i className="fas fa-info-circle"></i> Info - Medlemskap</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;