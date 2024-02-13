import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuItem: {
    padding: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2196F3', // Couleur bleue similaire à celle du web
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalContent: {
    width: '80%', // Largeur adaptée pour mobile
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#2196F3', // Même couleur que le bouton web
    borderRadius: 5,
    width: '100%', // Largeur complète dans le modal pour une meilleure manipulation
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16, // Taille de texte adaptée pour mobile
  },
});
