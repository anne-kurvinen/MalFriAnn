/* import { useEffect } from 'react'
import './App.css' */
import Carousel from './components/carousel/carousel.jsx';
import NavbarComponent from './components/navbar/NavbarComponent.jsx'


function App() {

/* 
  useEffect(() => {
    // Kommentera bort fetch-anropet tills backend är på plats
    /*
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`)
      })
  }, []) */

  return (
    <>
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
        <div>
    <>
          <NavbarComponent />

          <Carousel />
       </>

    
  );
}

export default App;