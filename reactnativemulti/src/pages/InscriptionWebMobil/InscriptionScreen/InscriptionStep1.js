import React ,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import CustomImagePicker from '../../../components/CustomImagePicker';
import CustomDatePicker from '../../../components/CustomDatePicker';


const InscriptionStep1 = ({onNextStep,formData}) => {
  const initialValues = {
    Username: formData.Username || '',
    LastName: formData.LastName || '',
    FirstName: formData.FirstName || '',
    BirthDate: formData.BirthDate || '',
    image: formData.image || null,
    Age: formData.Age || null,

  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string().required('Pseudo requis'),
    LastName: Yup.string().required('Nom requis'),
    FirstName: Yup.string().required('Prénom requis'),
    BirthDate: Yup.date().required('Date de naissance requise'),

  });
const getMaximumDate = () => {
  let today = new Date();
  return new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
};
const maxDate = getMaximumDate();
  const handleSubmit = values => {
    console.info(values);
    onNextStep(values);
  };
const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer} // Ajoutez ceci
    >
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
           enableReinitialize={true}
        >

        {({
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          values,
          errors,
          touched,
          dirty,
          isValid,
          setFieldValue,
        }) => (
          <View>
            {/* Image input for profile image */}
            <View style={styles.imageInputContainer}>
              {values.image && (
                <Image
                  source={{ uri: values.image }}
                  style={styles.ProfileImage}
                />
              )}
              <CustomImagePicker
                onImageSelected={uri => setFieldValue('image', uri)}
              />
            </View>
           <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
              placeholder="Nom d'utilisateur"
            />
            {errors.Username && touched.Username && (
              <Text>{errors.Username}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('LastName')}
              onBlur={handleBlur('LastName')}
              value={values.LastName}
              placeholder="Nom"
            />
            {errors.LastName && touched.LastName && (
              <Text>{errors.LastName}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('FirstName')}
              onBlur={handleBlur('FirstName')}
              value={values.FirstName}
              placeholder="Prénom"
            />
            {errors.FirstName && touched.FirstName && (
              <Text>{errors.FirstName}</Text>
            )}

            {/* Créer un bouton ou un champ pour ouvrir le DateTimePickerAjoutez un TouchableOpacity avec la condition que lma date soit superieur a 18*/}
              <CustomDatePicker
              initialDate={formData.BirthDate}
              onDateChange={(newDate) => {
                const birthDateString = newDate.toISOString().split('T')[0];
                setFieldValue('BirthDate', birthDateString);
                const age = calculateAge(birthDateString);
                setFieldValue('Age', age); // Enregistrez l'âge calculé dans le formulaire
              }}
              style={styles.input}
              maximumDate={maxDate}
            />

            <Button
              onPress={formikSubmit} // Utilisation de la fonction renommée
              title="Suivant"
              disabled={!isValid}
            />
          </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
InscriptionStep1.propTypes = {
  onNextStep: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
   contentContainer: {
    justifyContent: 'center', // Centrer le contenu verticalement
    //flexGrow: 1,
  },
  imageInputContainer: {
    alignItems: 'center', // Centrer l'image horizontalement
    marginBottom: 15,
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginTop: 20,
  },
  formContainer: {
  marginTop: 50,

  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
    width: '100%', // Assurez-vous que l'entrée s'étend
  },
});

export default InscriptionStep1;
