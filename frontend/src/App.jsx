// Import des Modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserBar from "./components/UserBar/UserBar";
import BarNav from "./components/BarNav/BarNav";

// Import des Pages
import LandingScreen from "./pages/LandingScreen/LandingScreen";
import Feed from "./pages/Feed/Feed";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import SurveyScreen from "./pages/SurveyScreen/SurveyScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditUserProfilScreen from "./pages/EditUserProfilScreen/EditUserProfilScreen";
import MyUserProfilScreen from "./pages/MyUserProfilScreen/MyUserProfilScreen";

// Import des Contexts
import { AuthProvider } from "./utils/useConnecte";
import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";
import { SurveyProvider } from "./contexts/SurveyContext";
import { EventProvider } from "./contexts/EventContext";

// Import des CSS
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <BarNav />
          <Routes>
            <Route path="/" element={<LandingScreen />} />
          </Routes>
          <UserProvider>
            <UserBar />
            <Routes>
              <Route path="/feed" element={<Feed />} />
              <Route
                path="/posts"
                element={
                  <PostProvider>
                    <PostScreen />
                  </PostProvider>
                }
              />
              <Route path="/connexion" element={<ConnexionScreen />} />
              <Route path="/inscription" element={<InscriptionScreen />} />
              <Route
                path="/events"
                element={
                  <EventProvider>
                    <EventsScreen />
                  </EventProvider>
                }
              />
              <Route
                path="/surveys"
                element={
                  <SurveyProvider>
                    <SurveyScreen />
                  </SurveyProvider>
                }
              />
              <Route path="/members" element={<MembersScreen />} />
              <Route path="/profile/:userId" element={<MyUserProfilScreen />} />
              <Route path="/myprofil" element={<MyUserProfilScreen />} />
              <Route path="/editprofil" element={<EditUserProfilScreen />} />
              <Route path="/changepassword" element={<ChangePassword />} />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
