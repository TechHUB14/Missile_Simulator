import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SimulationPage from "./components/SimulationPage";
import ExplosionInfo from "./components/ExplosionInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulate" element={<SimulationPage />}/>
      
   
      </Routes>
    </Router>
  );
}

export default App;
