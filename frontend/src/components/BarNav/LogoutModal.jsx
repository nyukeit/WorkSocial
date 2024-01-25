import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

function LogoutModal({ isOpen, onRequestClose, onLogout }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Déconnexion"
    >
      <h2>Confirmation de déconnexion</h2>
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
      <button type="button" onClick={onLogout}>
        Déconnexion
      </button>
      <button type="button" onClick={onRequestClose}>
        Annuler
      </button>
    </Modal>
  );
}

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Propriété isOpen doit être un booléen requis
  onRequestClose: PropTypes.func.isRequired, // Propriété onRequestClose doit être une fonction requise
  onLogout: PropTypes.func.isRequired, // Propriété onLogout doit être une fonction requise
};

export default LogoutModal;
