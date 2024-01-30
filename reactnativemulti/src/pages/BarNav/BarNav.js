// reactnativemulti/src/pages/BarNav/BarNav.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/images/logo.png';
import { useAuth } from '../../utils/useConnecte';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import styles from './style.web';

const BarNav = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState('Visiteur');

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    getUsername();
  }, [isLoggedIn]);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.menu}>
        <Text style={styles.welcomeMessage}>Bonjour {username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.menuItem}>Accueil</Text>
        </TouchableOpacity>
        {!isLoggedIn && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('ConnexionScreen')}>
              <Text style={styles.menuItem}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('InscriptionScreen')}>
              <Text style={styles.menuItem}>Inscription</Text>
            </TouchableOpacity>
          </>
        )}
        {isLoggedIn && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('MembersScreen')}>
              <Text style={styles.menuItem}>Membres</Text>
            </TouchableOpacity>
            <LogoutButton />
          </>
        )}
      </View>
    </View>
  );
};

export default BarNav;
