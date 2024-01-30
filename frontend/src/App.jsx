// Import des Modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarNav from "./components/BarNav/BarNav";

// Import des Pages
import HomeScreen from "./pages/HomeScreen/HomeScreen";
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
import { PostCommentProvider } from "./contexts/PostCommentContext";

// Import des CSS
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <BarNav />
          <UserProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/feed" element={<HomeScreen />} />
              <Route
                path="/posts"
                element={
                  <PostProvider>
                    <PostCommentProvider>
                      <PostScreen />
                    </PostCommentProvider>
                  </PostProvider>
                }
              />
              <Route path="/connexion" element={<ConnexionScreen />} />
              <Route path="/inscription" element={<InscriptionScreen />} />
              <Route path="/events" element={<EventsScreen />} />
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
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
