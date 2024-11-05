import { useState } from 'react';
import './App.css'; 

function App() {
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
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Logga In</a></li>
            <li className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                Bli Medlem
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="/contact">Registrering</a></li>
                  <li><a href="/faq">Info - Medlemskap</a></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;
