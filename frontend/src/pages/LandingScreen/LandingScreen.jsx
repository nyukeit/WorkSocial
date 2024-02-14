import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingScreen.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function LandingScreen() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="landing">
      <section id="hero" className="centered-text">
        <h1 id="hero-title">Trouvez votre connexion professionnelle</h1>
        <p id="hero-text">
          WorkSocial est le meilleur moyen de trouver des pairs et des collègues
          travaillant dans n'importe quelle entreprise.
        </p>
        <a className="hero-button" href="/inscription">
          Commencez Gratuite
        </a>
        <img
          src="src/assets/images/hero-image.png"
          alt="Hero"
          id="hero-image"
        />
      </section>
      <div id="features" className="centered-text">
        <Row>
          <h2 id="features-title">Fonctionnalités</h2>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <i className="fas fa-edit feature-icon" />
                <Card.Title>Postes</Card.Title>
                <Card.Text>
                  Lisez les messages et les mises à jour de vos contacts et
                  voyez comment ils améliorent leur vie professionnelle.
                  Partagez les vôtres en créant un article !
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <i className="fas fa-calendar-alt feature-icon" />
                <Card.Title>Events</Card.Title>
                <Card.Text>
                  Lisez les messages et les mises à jour de vos contacts et
                  voyez comment ils améliorent leur vie professionnelle.
                  Partagez les vôtres en créant un article !
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <i className="fas fa-poll feature-icon" />
                <Card.Title>Surveys</Card.Title>
                <Card.Text>
                  Lisez les messages et les mises à jour de vos contacts et
                  voyez comment ils améliorent leur vie professionnelle.
                  Partagez les vôtres en créant un article !
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <section id="chat" className="centered-text">
        <h2 id="features-title">Tchat avec d'autres professionnels</h2>
        <p id="hero-text">
          Tchatter et se connecter avec d'autres professionnels sur WorkSocial
          est aussi facile que de prendre son petit-déjeuner le matin.
        </p>
        <Row id="chat-features">
          <Col>
            <i className="fas fa-lock feature-icon" />
            <Card.Title className="feature-icon">Private</Card.Title>
            <Card.Text>
              Lisez les messages et les mises à jour de vos contacts et comment
              comment ils améliorent leur vie professionnelle. Partagez les
              Partagez les vôtres en créant un article !
            </Card.Text>
          </Col>
          <Col>
            <i className="fas fa-shield feature-icon" />
            <Card.Title className="feature-icon">Secure</Card.Title>
            <Card.Text>
              Lisez les messages et les mises à jour de vos contacts et comment
              comment ils améliorent leur vie professionnelle. Partagez les
              Partagez les vôtres en créant un article !
            </Card.Text>
          </Col>
          <Col>
            <i className="fas fa-gauge-simple-high feature-icon" />
            <Card.Title className="feature-icon">Ultra Fast</Card.Title>
            <Card.Text>
              Lisez les messages et les mises à jour de vos contacts et
              améliorent leur vie professionnelle. Partagez les Partagez les
              Partagez les vôtres en créant un article !
            </Card.Text>
          </Col>
        </Row>
        <a className="hero-button" href="/inscription">
          Commencez Gratuite
        </a>
      </section>
      <footer>
        <img src="src/assets/images/logo.png" alt="Logo" id="footer-logo" />
        <p id="footer-text">
          WorkSocial est le meilleur moyen de trouver des pairs et des collègues
          travaillant dans n'importe quelle entreprise.
        </p>
        <p>
          © {new Date().getFullYear()} WorkSocial. Créé avec ☕ et ❤️ en France
        </p>
      </footer>
    </div>
  );
}
