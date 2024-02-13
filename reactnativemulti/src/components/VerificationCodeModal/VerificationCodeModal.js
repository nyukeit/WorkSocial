import React, {useState} from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {hostname} from '../HostnameConnect/Hostname';
import VerifyEmail from '../VerifyEmail';

const VerificationCodeModal = ({visible, onRequestClose}) => {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(true);

  const handleVerification = (exists, message) => {
    setUserExists(exists);
  };

  const requestNewVerificationCode = async () => {
    try {
      const response = await fetch(`${hostname}/request-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getUserIdFromSomewhere(),
          email: email,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResendCode = () => {
    if (userExists) {
      requestNewVerificationCode(email);
      setEmail('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {userExists
              ? "Vous n'avez pas validé votre compte. Entrez votre email pour recevoir un nouveau code de vérification."
              : "Cette adresse e-mail n'est pas enregistrée. Veuillez vous inscrire."}
          </Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <VerifyEmail email={email} onVerification={handleVerification} />
          <Button title="Demander un nouveau code" onPress={handleResendCode} />
        </View>
      </View>
    </Modal>
  );
};

export default VerificationCodeModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
});