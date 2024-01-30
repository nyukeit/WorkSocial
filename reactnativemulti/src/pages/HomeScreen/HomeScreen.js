import React from 'react';
import { Platform, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../utils/useConnecte'; // Assurez-vous que le chemin est correct
import DisplayURL from '../../utils/DisplayURL';

const styles = Platform.OS === 'web'
  ? require('./styles.web').default
  : require('./styles.mobile').default;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.container}>
      <DisplayURL style={styles.urlText} />
      <Text style={styles.text}>Bienvenue sur l'écran d'accueil!</Text>
      <Text>Contenu de test WorkSocial demonstration</Text>

      {isLoggedIn ? (
        // Contenu pour les utilisateurs connectés
        <Text>Contenu exclusif pour les utilisateurs connectés</Text>
      ) : (
        // Bouton de bienvenue pour les utilisateurs non connectés
        <Button
          title="Welcome"
          onPress={() => navigation.navigate('ConnexionScreen')}
        />
      )}
    </View>
  );
};

export default HomeScreen;
