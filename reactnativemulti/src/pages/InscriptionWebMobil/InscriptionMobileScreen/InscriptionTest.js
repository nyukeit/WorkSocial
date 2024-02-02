import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InscriptionStep1 from './InscriptionStep1';
import InscriptionStep2 from './InscriptionStep2';
import InscriptionStep3 from './InscriptionStep3';
import {hostname} from '../../../components/HostnameConnect/Hostname';



const InscriptionScreen = () => {
  const navigate = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigation = useNavigation();
  const onNextStep = newData => {
    setFormData({...formData, ...newData});
    setStep(step + 1);
  };
  const onPreviousStep = () => {
    setStep(step - 1);
  };
const onFinalSubmit = async (finalData) => {
  const completeData = { ...formData, ...finalData, Role: "User" };
  const formDataToSend = new FormData();

  Object.keys(completeData).forEach((key) => {
    if (key === 'image') {
      const localUri = completeData[key];
      const filename = localUri.split('/').pop();
      const type = 'image/jpeg';

      formDataToSend.append('ProfileImage', {
        uri: localUri,
        type: type,
        name: filename,
      });
    } else {
      formDataToSend.append(key, completeData[key]);
    }
  });

 try {
  const response = await fetch(`${hostname}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formDataToSend,
  });

  if (response.ok) {
    const responseBody = await response.text();
    try {
      const data = JSON.parse(responseBody);
      console.log('Inscription réussie ! Données:', data);
      navigation.navigate('ConnexionScreen');
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error, 'Réponse:', responseBody);
    }
  } else {
    const errorText = await response.text();
    console.error('Erreur lors de l\'inscription. Statut de la réponse:', response.status, 'Message d\'erreur:', errorText);
  }
} catch (error) {
  console.error('Erreur lors de la requête:', error);
}

};





  return (
    <View style={styles.container}>
      {step === 1 && <InscriptionStep1 onNextStep={onNextStep} formData={formData} />}
      {step === 2 && (
        <InscriptionStep2
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          formData={formData}
        />
      )}
      {step === 3 && (
        <InscriptionStep3
          onFinalSubmit={onFinalSubmit}
          onPreviousStep={onPreviousStep}
          formData={formData}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default InscriptionScreen;
