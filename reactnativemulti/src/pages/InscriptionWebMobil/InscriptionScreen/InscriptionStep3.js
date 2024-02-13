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

const InscriptionStep3 = ({ onFinalSubmit, onPreviousStep, formData }) => {
  const initialValues = {
    Password: formData.Password || '',
    confirmPassword: formData.confirmPassword || '',
    Gender: formData.Gender || '',
    Biography: formData.Biography || '',
    Role:"User",
  };

 const validationSchema = Yup.object().shape({
    Password: Yup.string().required('Mot de passe requis'),
    Biography: Yup.string().required('Biographie requise'),
    Gender: Yup.string().required('Genre requis'),
    // il faut afficher le role juste l'injecter  automatiquement comme user
    // Role: Yup.string(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), null], 'Les mots de passe doivent correspondre')
      .required('Confirmez le mot de passe'),
  });


const handleSubmit = values => {
  console.log("Valeurs soumises (avant la suppression de confirmPassword):", values);

  // Destructure confirmPassword from values and get the rest of the data
  const { confirmPassword, ...dataToSubmit } = values;

  // Convert the selected 'Gender' value to lowercase
  dataToSubmit.Gender = dataToSubmit.Gender.toLowerCase();

  console.log("Valeurs soumises pour l'inscription finale (sans confirmPassword):", dataToSubmit);

  // Pass the data without confirmPassword to the final submit function
  onFinalSubmit(dataToSubmit);
};


  return (
    <ScrollView style={styles.container}>
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
            <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
          )}

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={values.Gender === 'Homme'}
                onValueChange={() => {
                  handleChange('Gender')('Homme');
                }}
              />
              <Text>Homme</Text>

              <CheckBox
                value={values.Gender === 'Femme'}
                onValueChange={() => {
                  handleChange('Gender')('Femme');
                }}
              />
              <Text>Femme</Text>

              <CheckBox
                value={values.Gender === 'Autres'}
                onValueChange={() => {
                  handleChange('Gender')('Autres');
                }}
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
                disabled={!dirty || !isValid || !values.Password || !!errors.confirmPassword}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

InscriptionStep3.propTypes = {
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

export default InscriptionStep3;