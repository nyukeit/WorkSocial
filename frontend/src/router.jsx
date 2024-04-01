// Import Modules
import { createBrowserRouter } from "react-router-dom";

// Import Pages
import App from "./App";
import LandingScreen from "./pages/LandingScreen/LandingScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import Dashboard from "./pages/Feed/Dashboard";
import PostScreen from "./pages/PostScreen/PostScreen";
import EventScreen from "./pages/EventsScreen/EventsScreen";
import EventPage from "./pages/EventPage/EventPage";
import SurveyScreen from "./pages/SurveyScreen/SurveyScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingScreen />,
        index: true,
      },
      {
        path: "/connexion",
        element: <ConnexionScreen />,
      },
      {
        path: "/inscription",
        element: <InscriptionScreen />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/posts",
        element: <PostScreen />,
      },
      {
        path: "/events",
        element: <EventScreen />,
        children: [
          {
            path: "/:eventID",
            element: <EventPage />,
          },
        ],
      },
      {
        path: "/surveys",
        element: <SurveyScreen />,
      },
    ],
  },
]);

export default router;
