import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarNav from "./components/BarNav/BarNav";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import Sendage from "./pages/SendageScreen/SendageScreen";

import "./App.css";

function App() {
  return (
    <Router>
      <BarNav />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/PostScreen" element={<PostScreen />} />
        <Route path="/ConnexionScreen" element={<ConnexionScreen />} />
        <Route path="/InscriptionScreen" element={<InscriptionScreen />} />
        <Route path="/EventsScreen" element={<EventsScreen />} />
        <Route path="/Sendage" element={<Sendage />} />
      </Routes>
    </Router>
  );
}

export default App;
