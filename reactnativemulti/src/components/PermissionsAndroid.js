import {PermissionsAndroid, Platform} from 'react-native';

export const checkCameraAndStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== 'granted' ||
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !==
        'granted'
    ) {
      console.error('Permission refusée');
      return false;
    } else {
      console.info('Vous pouvez utiliser la caméra et accéder au stockage');
      return true;
    }
  }

  // Gérer Android 11 et versions ultérieures où WRITE_EXTERNAL_STORAGE n'est pas requis
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permission de Caméra',
        message: "Cette application a besoin d'accéder à votre caméra",
        buttonNeutral: 'Demander Plus Tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.error('Permission de caméra refusée');
      return false;
    } else {
      console.info('Vous pouvez utiliser la caméra');
      return true;
    }
  }
};

export default checkCameraAndStoragePermission;
