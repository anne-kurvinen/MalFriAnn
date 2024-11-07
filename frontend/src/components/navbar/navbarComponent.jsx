import './NavbarComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function NavbarComponent() {

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><a href="/"><i className="fas fa-home"></i> Home</a></li>
            <li><a href="/om-oss"><i className="fas fa-clock"></i> Öppettider</a></li>
            <li><a href="/inställningar"><i className="fas fa-cog"></i> Inställningar</a></li>  
            <li><a href="/inlogg"><i className="fas fa-sign-in-alt"></i> Logga In</a></li>       
            <li className="dropdown">
              <button className="dropdown-btn"><i className="fas fa-user-plus"></i> Bli Medlem</button>
              <ul className="dropdown-menu">
                <li><a href="/registrering"><i className="fas fa-user-edit"></i> Registrering</a></li>
                <li><a href="/info"><i className="fas fa-info-circle"></i> Info - Medlemskap</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;