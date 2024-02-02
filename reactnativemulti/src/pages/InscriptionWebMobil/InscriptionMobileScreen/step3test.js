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
import {Picker} from '@react-native-picker/picker';
import {hostname} from '../../../components/HostnameConnect/Hostname';
import {useNavigation} from '@react-navigation/native';

const InscriptionStep3 = ({onFinalSubmit, onPreviousStep, formData}) => {
   const navigation = useNavigation();

  const initialValues = {
    Password: formData.Password || '',
    confirmPassword: formData.confirmPassword || '',
    Gender: formData.Gender || '',
    Biography: formData.Biography || '',
    Role: "User",
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

const handleSubmit = async (values) => {
  console.log("Valeurs soumises (avant la suppression de confirmPassword):", values);

  const { confirmPassword, ...dataToSubmit } = values;
  dataToSubmit.Gender = dataToSubmit.Gender.toLowerCase();
  dataToSubmit.Role = "User";

  const formData = new FormData();
  Object.keys(dataToSubmit).forEach(key => {
    formData.append(key, dataToSubmit[key]);
  });

  try {
    const response = await fetch(`${hostname}/users`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      navigation.navigate('ConnexionScreen');
    } else {
      const errorText = await response.text();
      console.error(`Erreur lors de l'inscription : ${errorText}`);
    }
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
  }
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

            <View style={styles.formGroup}>
              <Text>Genre</Text>
              <Picker
                selectedValue={values.Gender}
                onValueChange={handleChange('Gender')}
                style={styles.pickerStyle}>
                <Picker.Item label="Sélectionnez un genre" value="" />
                <Picker.Item label="Homme" value="Homme" />
                <Picker.Item label="Femme" value="Femme" />
                <Picker.Item label="Autres" value="Autres" />
              </Picker>
              {errors.Gender && touched.Gender && <Text style={styles.errorText}>{errors.Gender}</Text>}
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
   pickerStyle: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default InscriptionStep3;