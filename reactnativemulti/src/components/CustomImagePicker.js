import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {checkCameraAndStoragePermission} from './PermissionsAndroid';

const CustomImagePicker = ({onImageSelected}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openImagePickerModal = () => {
    setModalVisible(true);
  };
  const handleTakePhoto = async () => {
    console.log('Demande de permission de caméra...');
    const hasCameraPermission = await checkCameraAndStoragePermission();
    if (!hasCameraPermission) {
      console.log('Permission de caméra refusée');
      Alert.alert(
        'Permission refusée',
        'La permission de caméra est nécessaire pour prendre une photo.',
      );
      return;
    }
    console.log('Lancement de la caméra...');
    launchCamera({mediaType: 'photo'}, response => {
      console.log('Réponse de la caméra:', response);
      if (response.didCancel) {
        Alert.alert('Annulé');
      } else if (response.errorCode) {
        Alert.alert('Erreur de la caméra', response.errorMessage);
      } else if (onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
    });
  };

  const handleChooseFromLibrary = async () => {
    console.log('Problème de permission de stockage...');
    const hasStoragePermission = await checkCameraAndStoragePermission();
    if (!hasStoragePermission) {
      console.log('Permission de stockage refusée');
      Alert.alert(
        'Permission refusée',
        'La permission de lire le stockage est nécessaire pour choisir une photo.',
      );
      return;
    }

    console.log('Ouverture de la bibliothèque de photos...');
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('Réponse de la bibliothèque de photos:', response);
      if (response.didCancel) {
        Alert.alert('Annulé');
      } else if (response.errorCode) {
        Alert.alert('Erreur de la bibliothèque', response.errorMessage);
      } else if (onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button title="Sélectionner une image" onPress={openImagePickerModal} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleTakePhoto();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Prendre une photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleChooseFromLibrary();
                setModalVisible(!modalVisible
                );
              }
            }>


          <Text style={styles.textStyle}>Choisir de la bibliothèque</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
</View>
);
};

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
button: {
borderRadius: 20,
padding: 10,
elevation: 2,
backgroundColor: '#2196F3',
marginBottom: 10,
},
textStyle: {
color: 'white',
fontWeight: 'bold',
textAlign: 'center',
},
// ... autres styles
});

export default CustomImagePicker;



