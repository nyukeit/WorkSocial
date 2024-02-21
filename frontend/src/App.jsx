// Import des Modules
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarNav from "./components/BarNav/BarNav";

// Import des Pages
import LandingScreen from "./pages/LandingScreen/LandingScreen";
import Dashboard from "./pages/Feed/Dashboard";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import EventPage from "./pages/EventPage/EventPage";
import CompaniesScreen from "./pages/CompaniesScreen/CompaniesScreen";
import SurveyScreen from "./pages/SurveyScreen/SurveyScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditUserProfilScreen from "./pages/EditUserProfilScreen/EditUserProfilScreen";
import MyUserProfilScreen from "./pages/MyUserProfilScreen/MyUserProfilScreen";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import VerifyUser from "./pages/VerifyUser/VerifyUser";

// Import des Contexts
import { AuthProvider } from "./utils/useConnecte";
import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";
import { SurveyProvider } from "./contexts/SurveyContext";
import { EventProvider } from "./contexts/EventContext";
import { CompanyProvider } from "./contexts/CompanyContext";

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
              <Route path="/" element={<LandingScreen />} />
              <Route
                path="/dashboard"
                element={
                  <EventProvider>
                    <Dashboard />
                  </EventProvider>
                }
              />
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
                path="/events/:eventId"
                element={
                  <EventProvider>
                    <EventPage />
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
              <Route
                path="/companies"
                element={
                  <CompanyProvider>
                    <CompaniesScreen />
                  </CompanyProvider>
                }
              />
              <Route
                path="/members"
                element={
                  <CompanyProvider>
                    <MembersScreen />
                  </CompanyProvider>
                }
              />
              <Route path="/profile/:userId" element={<MyUserProfilScreen />} />
              <Route path="/myprofil" element={<MyUserProfilScreen />} />
              <Route path="/editprofil" element={<EditUserProfilScreen />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route path="/resetpassword/:key" element={<ResetPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
          </UserProvider>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
