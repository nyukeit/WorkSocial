import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarNav from "./components/BarNav/BarNav";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import SurveyScreen from "./pages/SurveyScreen/SurveyScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import MyProfileScreen from "./pages/MyProfileScreen/MyProfileScreen";
import { AuthProvider } from "./utils/useConnecte";
import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";
import { SurveyProvider } from "./contexts/SurveyContext";

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
              <Route path="/HomeScreen" element={<HomeScreen />} />
              <Route
                path="/posts"
                element={
                  <PostProvider>
                    <PostScreen />
                  </PostProvider>
                }
              />
              <Route path="/ConnexionScreen" element={<ConnexionScreen />} />
              <Route
                path="/InscriptionScreen"
                element={<InscriptionScreen />}
              />
              <Route path="/EventsScreen" element={<EventsScreen />} />
              <Route
                path="/surveys"
                element={
                  <SurveyProvider>
                    <SurveyScreen />
                  </SurveyProvider>
                }
              />
              <Route path="/MembersScreen" element={<MembersScreen />} />
              <Route path="/profile/:userId" element={<MyProfileScreen />} />
            </Routes>
          </UserProvider>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
