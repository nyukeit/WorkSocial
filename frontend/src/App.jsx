import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarNav from "./components/BarNav/BarNav";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import SendageScreen from "./pages/SendageScreen/SendageScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import MyProfileScreen from "./pages/MyProfileScreen/MyProfileScreen";
import { AuthProvider } from "./utils/useConnecte";
import { PostProvider } from "./contexts/PostContext";

import "./App.css";

function App() {
  return (
    // <React.StrictMode>
    //   <AuthProvider>
    //     <Router>
    //       <BarNav />
    //       <Routes>
    //         <Route path="/" element={<HomeScreen />} />
    //         <Route path="/HomeScreen" element={<HomeScreen />} />
    //         <PostProvider>
    //           <Route path="/posts" element={<PostScreen />} />
    //         </PostProvider>
    //         <Route path="/ConnexionScreen" element={<ConnexionScreen />} />
    //         <Route path="/InscriptionScreen" element={<InscriptionScreen />} />
    //         <Route path="/EventsScreen" element={<EventsScreen />} />
    //         <Route path="/SendageScreen" element={<SendageScreen />} />
    //         <Route path="/MembersScreen" element={<MembersScreen />} />
    //         <Route path="/profile/:userId" element={<MyProfileScreen />} />
    //       </Routes>
    //     </Router>
    //   </AuthProvider>
    // </React.StrictMode>
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <>
            <BarNav />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/HomeScreen" element={<HomeScreen />} />

              {/* Wrap BarNav and Routes with React.Fragment */}
              <Route
                path="/posts"
                element={
                  // <React.Fragment>
                  <PostProvider>
                    <PostScreen />
                  </PostProvider>
                  // </React.Fragment>
                }
              />

              <Route path="/ConnexionScreen" element={<ConnexionScreen />} />
              <Route
                path="/InscriptionScreen"
                element={<InscriptionScreen />}
              />
              <Route path="/EventsScreen" element={<EventsScreen />} />
              <Route path="/SendageScreen" element={<SendageScreen />} />
              <Route path="/MembersScreen" element={<MembersScreen />} />
              <Route path="/profile/:userId" element={<MyProfileScreen />} />
            </Routes>
          </>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
