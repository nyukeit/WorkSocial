import React, {useState} from 'react';
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
import VerifyUsername from '../../../components/VerifyUsername';

const InscriptionStep1 = ({onNextStep, formData}) => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [imageTouched, setImageTouched] = useState(false);

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
    image: Yup.string().required("L'image est obligatoire"),
  });
  const getMaximumDate = () => {
    let today = new Date();
    return new Date(
      today.getFullYear() - 16,
      today.getMonth(),
      today.getDate(),
    );
  };
  const maxDate = getMaximumDate();
  const handleSubmit = values => {
    console.info(values);
    onNextStep(values);
  };
  const calculateAge = birthDate => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };
  const handleUsernameChange = (handleChange, fieldName) => text => {
    handleChange(fieldName)(text);
    setUsernameAvailable(true);
  };

  const onUsernameVerification = (isAvailable, message) => {
    setUsernameAvailable(isAvailable);
    if (!isAvailable) {
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          values,
          errors,
          touched,
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => (
          <View>
            {/* Image input for profile image */}
            <View style={styles.imageInputContainer}>
              {values.image ? (
                <Image
                  source={{uri: values.image}}
                  style={styles.ProfileImage}
                />
              ) : null}
              <CustomImagePicker
                onImageSelected={uri => {
                  setFieldValue('image', uri);
                  setFieldTouched('image', true);
                  setImageTouched(true);
                }}
              />
              {!values.image && (
                <Text style={styles.imagePlaceholder}>Image obligatoire</Text>
              )}
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleUsernameChange(handleChange, 'Username')}
                onBlur={handleBlur('Username')}
                value={values.Username}
                placeholder="Pseudo"
              />
              {!usernameAvailable && (
                <Text>Le nom d'utilisateur est déjà pris.</Text>
              )}

              {/* Vérification d'unicité du nom d'utilisateur */}
              <VerifyUsername
                username={values.Username}
                onVerification={onUsernameVerification}
              />
              {touched.Username && errors.Username && (
                <Text
                  style={[
                    styles.error,
                    touched.Username && errors.Username ? {color: 'red'} : {},
                  ]}>
                  {errors.Username}
                </Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={handleChange('LastName')}
                onBlur={handleBlur('LastName')}
                value={values.LastName}
                placeholder="Nom"
              />
              {touched.LastName && errors.LastName && (
                <Text
                  style={[
                    styles.error,
                    touched.LastName && errors.LastName ? {color: 'red'} : {},
                  ]}>
                  {errors.LastName}
                </Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={handleChange('FirstName')}
                onBlur={handleBlur('FirstName')}
                value={values.FirstName}
                placeholder="Prénom"
              />
              {touched.FirstName && errors.FirstName && (
                <Text
                  style={[
                    styles.error,
                    touched.FirstName && errors.FirstName ? {color: 'red'} : {},
                  ]}>
                  {errors.FirstName}
                </Text>
              )}

              {/* Créer un bouton ou un champ pour ouvrir le DateTimePickerAjoutez un TouchableOpacity avec la condition que lma date soit superieur a 18*/}
              <CustomDatePicker
                initialDate={formData.BirthDate}
                onDateChange={newDate => {
                  const birthDateString = newDate.toISOString().split('T')[0];
                  setFieldValue('BirthDate', birthDateString);
                  const age = calculateAge(birthDateString);
                  setFieldValue('Age', age); // Enregistrez l'âge calculé dans le formulaire
                }}
                style={styles.input}
                maximumDate={maxDate}
              />
              {touched.BirthDate && errors.BirthDate && (
                <Text
                  style={[
                    styles.error,
                    touched.BirthDate && errors.BirthDate ? {color: 'red'} : {},
                  ]}>
                  {errors.BirthDate}
                </Text>
              )}
              <Button
                onPress={formikSubmit}
                title="Suivant"
                // Désactiver le bouton si le formulaire n'est pas valide OU si le nom d'utilisateur n'est pas disponible
                disabled={!isValid || !usernameAvailable || !values.image}
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
  error: {
    color: 'red',
  },
  imagePlaceholder: {
    color: 'red', // Couleur du texte en rouge
    fontStyle: 'italic', // Texte en italique (facultatif)
    // Autres styles de mise en forme au besoin
  },
});

export default InscriptionStep1;
