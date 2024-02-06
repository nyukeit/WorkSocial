import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AddressAutoPicker from '../../../components/AddressAutoPicker';
import GeoMapPicker from '../../../components/GeoMapPicker';

const InscriptionScreenStep2 = ({onNextStep, onPreviousStep, formData}) => {
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const initialValues = {
    Address: formData.Address || '',
  };

  const validationSchema = Yup.object().shape({
    Address: Yup.string().required('Adresse requise'),
  });

  const handleSubmit = values => {
    console.log(values);
    onNextStep(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}>
        {({
          handleChange,
          handleSubmit: formikSubmit,
          setFieldValue, // Ajoutez setFieldValue ici
          values,
          errors,
          touched,
          isValid,
        }) => {
          // Définissez handleAddressSelect ici pour avoir accès à setFieldValue
          const handleAddressSelect = (address, lat, lng) => {
            setSelectedAddress(address);
            setSelectedLatitude(lat);
            setSelectedLongitude(lng);
            setFieldValue('Address', address);
          };

          return (
            <View>
              <View style={styles.Address}>
                <AddressAutoPicker
                  onAddressSelect={(
                    selectedAddress,
                    suggestion,
                    latitude,
                    longitude,
                  ) => {
                    handleChange('Address')(selectedAddress); // Met à jour Formik
                    setSelectedLatitude(latitude);
                    setSelectedLongitude(longitude);
                  }}
                  selectedAddress={values.Address} // Utilisez values.Address pour garder Formik et l'input synchronisés
                  selectedLatitude={selectedLatitude}
                  selectedLongitude={selectedLongitude}
                />

                {errors.Address && touched.Address && (
                  <Text>{errors.Address}</Text>
                )}
              </View>
              <View style={styles.GeoMapPicker}>
                <GeoMapPicker
                  onAddressSelect={handleAddressSelect}
                  selectedLatitude={selectedLatitude}
                  selectedLongitude={selectedLongitude}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button onPress={onPreviousStep} title="Retour" />
                <Button
                  onPress={formikSubmit}
                  title="Suivant"
                  disabled={!isValid}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Address: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  GeoMapPicker: {
    marginVertical: 10,
    height: '70%',
    width: '90%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default InscriptionScreenStep2;
