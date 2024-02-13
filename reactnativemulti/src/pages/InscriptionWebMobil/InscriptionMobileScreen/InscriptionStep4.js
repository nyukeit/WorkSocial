import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import CheckBox from '@react-native-community/checkbox';

const InscriptionStep4 = ({ onFinalSubmit, onPreviousStep, formData }) => {
  const initialValues = {
    Password: formData.Password || '',
    confirmPassword: formData.confirmPassword || '',
    Gender: formData.Gender || '',
    Biography: formData.Biography || '',
    Role:"User",
  };

const validationSchema = Yup.object().shape({
    Password: Yup.string().required('Mot de passe requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), null], 'Les mots de passe doivent correspondre')
      .required('Confirmez le mot de passe'),
    Gender: Yup.string().required('Genre requis'),
    Biography: Yup.string().required('Biographie requise'),
    // Ajoutez d'autres validations si nécessaire
  });


const handleSubmit = values => {
  console.log("Valeurs soumises:", values);

  // Exclure confirmPassword des données à envoyer
  const { confirmPassword, ...dataToSubmit } = values;
  dataToSubmit.Role = "User";
  console.log("Valeurs soumises pour l'inscription finale:", dataToSubmit);
  onFinalSubmit(dataToSubmit);
};

  return (
    <ScrollView style={styles.container}>
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
          dirty,
          isValid,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('Password')}
              onBlur={handleBlur('Password')}
              value={values.Password}
              secureTextEntry={true}
              placeholder="Mot de passe"
            />
            {errors.Password && touched.Password && (
              <Text>{errors.Password}</Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={true}
              placeholder="Confirmez le mot de passe"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={values.Gender === 'Male'}
                onValueChange={() => handleChange('Gender')('Male')}
              />
              <Text>Homme</Text>

              <CheckBox
                value={values.Gender === 'Female'}
                onValueChange={() => handleChange('Gender')('Female')}
              />
              <Text>Femme</Text>

              <CheckBox
                value={values.Gender === 'Other'}
                onValueChange={() => handleChange('Gender')('Other')}
              />
              <Text>Autres</Text>
            </View>

            {errors.Gender && touched.Gender && <Text>{errors.Gender}</Text>}

            <TextInput
              style={styles.BiographyInput}
              onChangeText={handleChange('Biography')}
              onBlur={handleBlur('Biography')}
              value={values.Biography}
              multiline={true}
              placeholder="Biographie"
            />
            {errors.Biography && touched.Biography && (
              <Text>{errors.Biography}</Text>
            )}

            <View style={styles.buttonContainer}>
              <Button onPress={onPreviousStep} title="Retour" />
              <Button
                onPress={formikSubmit}
                title="Terminer l'inscription"
                disabled={
                  !dirty ||
                  !isValid ||
                  !values.Password ||
                  !!errors.confirmPassword
                }
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

InscriptionStep4.propTypes = {
  onFinalSubmit: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
  },
  BiographyInput: {
    borderWidth: 1,
    borderColor: 'gray',
    //paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 15,
    height: 100,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default InscriptionStep4;