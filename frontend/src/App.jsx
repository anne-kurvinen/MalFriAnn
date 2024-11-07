/* import { useEffect } from 'react' */
import './App.css'
import Carousel from './components/carousel/carousel.jsx';
import NavbarComponent from './components/navbar/NavbarComponent.jsx'


function App() {

/* 
  useEffect(() => {
    // Kommentera bort fetch-anropet tills backend är på plats
    /*
/*   useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`)
      })
  }, []) */

  return (
    <>
      <NavbarComponent />
      <Carousel />
    </>
  );
}

export default App;
