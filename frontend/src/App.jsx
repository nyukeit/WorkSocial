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
import EditProfileScreen from "./pages/EditProfileScreen/EditProfileScreen";
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
              <Route path="/feed" element={<HomeScreen />} />
              <Route
                path="/posts"
                element={
                  <PostProvider>
                    <PostScreen />
                  </PostProvider>
                }
              />
<<<<<<< HEAD
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
=======
              <Route path="/connexion" element={<ConnexionScreen />} />
              <Route path="/inscription" element={<InscriptionScreen />} />
              <Route path="/events" element={<EventsScreen />} />
              <Route path="/surveys" element={<SendageScreen />} />
              <Route path="/members" element={<MembersScreen />} />
>>>>>>> 2958bf4ee429962fc7245677de34db1f15dd1913
              <Route path="/profile/:userId" element={<MyProfileScreen />} />
              <Route path="/editprofile" element={<EditProfileScreen />} />
            </Routes>
          </UserProvider>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
