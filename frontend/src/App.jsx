import { useState, useEffect } from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './Pages/Registration';

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Kommentera bort fetch-anropet tills backend är på plats
    /*
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`)
      });
    */
    console.log("Simulerad backend-svar: Hello World");
  }, []);

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <ul className="navbar-list">
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/om-oss">Öppettider</Link></li> 
            <li><Link to="/services">Services</Link></li>  
            <li><Link to="/inlog">Logga In</Link></li>  
            <li className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                Bli Medlem
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/registrering">Registrering</Link></li>  
                  <li><Link to="/info">Info - Medlemskap</Link></li>  
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Routes definierar vad som ska visas på respektive sida */}
      <Routes>
        <Route 
          path="/" 
          element={
            <div>
              <h1>VÄLKOMMEN TILL VÅRT TRÄNINGSCENTER!</h1>
              <p>This is the content below the sticky navbar.</p>
            </div>
          } 
        />
        <Route path="/registrering" element={<Registration />} />
        {/* Lägg till fler rutter här */}
      </Routes>
    </Router>
  );
}

export default App;