// Import Modules
import { Link } from "react-router-dom";

// Import Components
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserBar from "../../components/UserBar/UserBar";
import ImageWithJWT from "../../utils/ImageWithJWT";

// Import Store
import useUserStore from "../../store/userStore";

// Import Styles
import "./MyUserProfilScreen.css";

/**
 * Component for showing details of the current user.
 *
 * @component
 * @function MyUserProfilScreen
 * @returns {JSX.Element}
 */

function MyUserProfilScreen() {
  const currentUser = useUserStore((state) => state.currentUser);

  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/upload/${
    currentUser.ProfileImage
  }`;
  return (
    <div className="container">
      <UserBar />
      <div className="innerContainer">
        {/* <h2 className="page-title">User Profile</h2> */}
        <div className="profilePage-leftSection">
          <div className="profilePage-image">
            <ImageWithJWT imageUrl={imageUrl} alt={currentUser.FirstName} />
          </div>
          <div className="profilePage-userInfo">
            <h4>
              {currentUser.FirstName} {currentUser.LastName}
            </h4>
            <p>{currentUser.Email}</p>
            <p>{currentUser.Biography}</p>
            <Link to="/editprofil" className="linkButton">
              <Button type="button">Modifier</Button>
            </Link>
          </div>
        </div>
        <div className="profilePage-rightSection">
          <Tabs defaultActiveKey="posts" className="mb-3">
            <Tab eventKey="posts" title="Posts">
              {/* Afficher les posts de l'utilisateur ici */}
            </Tab>
            <Tab eventKey="events" title="Events">
              {/* Afficher les événements de l'utilisateur ici */}
            </Tab>
            <Tab eventKey="surveys" title="Surveys">
              {/* Afficher les sondages de l'utilisateur ici */}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MyUserProfilScreen;
