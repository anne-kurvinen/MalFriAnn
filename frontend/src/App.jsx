/* import { useEffect } from 'react' */
import './App.css'
import NavbarComponent from './components/navbar/NavbarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import Registration from "./pages/Registration"; */
import Home from "./pages/Home";
import OmOss from "./pages/OmOss";
/* import Installningar from "./pages/Installningar"; */
/* import Inlogg from "./pages/Inlogg"; */
/* import Info from "./pages/Info"; */
import "@fortawesome/fontawesome-free/css/all.min.css";
import StartPage from './pages/StartPage.jsx';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
      <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/om-oss" element={<OmOss />} />
       {/*  <Route path="/installningar" element={<Installningar />} /> */}
     {/*    <Route path="/inlogg" element={<Inlogg />} /> */}
       {/*  <Route path="/registration" element={<Registration />} /> */}
        {/* <Route path="/info" element={<Info />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
