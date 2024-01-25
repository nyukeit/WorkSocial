import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditUserProfilScreen from "./pages/EditUserProfilScreen/EditUserProfilScreen";
import MyUserProfilScreen from "./pages/MyUserProfilScreen/MyUserProfilScreen";
import BarNav from "./components/BarNav/BarNav";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import SendageScreen from "./pages/SendageScreen/SendageScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import MyProfileScreen from "./pages/MyProfileScreen/MyProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen/EditProfileScreen";
import { AuthProvider } from "./utils/useConnecte";
import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";

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
              <Route path="/connexion" element={<ConnexionScreen />} />
              <Route path="/inscription" element={<InscriptionScreen />} />
              <Route path="/events" element={<EventsScreen />} />
              <Route path="/surveys" element={<SendageScreen />} />
              <Route path="/members" element={<MembersScreen />} />
              <Route path="/profile/:userId" element={<MyProfileScreen />} />
              <Route path="/editprofile" element={<EditProfileScreen />} />
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
