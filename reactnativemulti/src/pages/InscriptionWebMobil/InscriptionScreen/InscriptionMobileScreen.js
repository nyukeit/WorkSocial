import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InscriptionStep1 from './InscriptionStep1';
import InscriptionStep2 from './InscriptionStep2';
import InscriptionStep3 from './InscriptionStep3';



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
const onFinalSubmit = async finalData => {
  const completeData = {...formData, ...finalData};
  const formDataToSend = new FormData();

  Object.keys(completeData).forEach(key => {
    if (key === 'image') {
      const localUri = completeData[key];
      const filename = localUri.split('/').pop();

      // Inférez le type de l'image
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      // Ajoutez l'image en tant que fichier dans formData
      formDataToSend.append(key, {
        uri: localUri,
        name: filename,
        type
      });
    } else {
      // Ajout des autres données dans formDataToSend
      formDataToSend.append(key, completeData[key]);
    }
  });

  // Ajouter des valeurs supplémentaires si nécessaire
  formDataToSend.append('Role', 'someDefaultValue');

  try {
    const response = await fetch('http://192.168.1.62:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formDataToSend,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data inscription', data);
      // Navigation après l'inscription réussie
      navigation.navigate('ConnexionScreen');
    } else {
      // Gestion des erreurs
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error("Erreur lors de l'inscription:", errorData);
      } else {
        console.error("Réponse non JSON reçue:", await response.text());
      }
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
