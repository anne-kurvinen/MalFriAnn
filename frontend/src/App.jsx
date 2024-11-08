<<<<<<< Updated upstream
/* import { useEffect } from 'react' */
import './App.css'
/* import { useEffect } from 'react' */
import './App.css'
import Carousel from './components/carousel/carousel.jsx';
import NavbarComponent from './components/navbar/NavbarComponent.jsx'
import GymInfo from './components/gymInfo/gymInfo.jsx';
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar/NavbarComponent";
import Carousel from "./components/carousel/Carousel";
/* import Registration from "./pages/Registration"; */
import Home from "./pages/Home";
import OmOss from "./pages/OmOss";
/* import Installningar from "./pages/Installningar"; */
/* import Inlogg from "./pages/Inlogg"; */
/* import Info from "./pages/Info"; */
import "@fortawesome/fontawesome-free/css/all.min.css";

>>>>>>> Stashed changes
function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/om-oss" element={<OmOss />} />
       {/*  <Route path="/installningar" element={<Installningar />} /> */}
     {/*    <Route path="/inlogg" element={<Inlogg />} /> */}
       {/*  <Route path="/registration" element={<Registration />} /> */}
        {/* <Route path="/info" element={<Info />} /> */}
      </Routes>
      <Carousel />
<<<<<<< Updated upstream
      <GymInfo />
    </>
=======
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
