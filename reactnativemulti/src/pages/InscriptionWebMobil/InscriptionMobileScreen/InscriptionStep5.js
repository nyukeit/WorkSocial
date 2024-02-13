import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Assurez-vous d'importer useNavigation
import {hostname} from '../../../components/HostnameConnect/Hostname';

const InscriptionStep5 = ({formData}) => {
  const {userId, email} = formData; // Utiliser directement formData sans onVerificationSuccess
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const validateCode = async () => {
    try {
      const response = await fetch(`${hostname}/verify-email-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Assurez-vous que votre API backend accepte userId pour la vérification
          code: code,
        }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Your email has been verified!');
        // Après la vérification réussie, redirigez l'utilisateur vers la page de connexion
        navigation.navigate('ConnexionScreen');
      } else {
        Alert.alert('Error', jsonResponse.message || 'Failed to verify code.');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du code:', error);
      Alert.alert('Error', 'An error occurred during code verification.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your verification code</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Verification Code"
        keyboardType="number-pad"
      />
      <Button title="Validate Code" onPress={validateCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default InscriptionStep5;