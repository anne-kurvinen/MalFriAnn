import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`)
      })
  }, [])

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><a href="/">Home</a></li>
            <li><a href="/om-oss">Öppettider</a></li>
            <li><a href="/services">Services</a></li>  
            <li><a href="/inlog">Logga In</a></li>       
            <li className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
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

            {/* Resten av din app-innehåll här */}
            <div>
        <h1>VÄLKOMMEN TILL VÅRT TRÄNINGSCENTER!</h1>
        <p>This is the content below the sticky navbar.</p>
      </div>
    </div>
  );
}
export default App;
