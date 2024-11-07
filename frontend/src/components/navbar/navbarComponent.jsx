import { useState } from 'react';
import './NavbarComponent.css';


function NavbarComponent() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><a href="/">Home</a></li>
            <li><a href="/om-oss">Öppettider</a></li>
            <li><a href="/inställningar">Inställningar</a></li>  
            <li><a href="/inlog">Logga In</a></li>       
            <li className="dropdown">
              <button className="dropdown-btn" onMouseOver={toggleDropdown}>
                Bli Medlem
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="/registrering">Registrering</a></li>
                  <li><a href="/info">Info - Medlemskap</a></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default NavbarComponent;
