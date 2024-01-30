import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const InscriptionStep2 = ({onNextStep, onPreviousStep,formData}) => {
  const initialValues = {
    Address:formData.Address || '',
    Email: formData.Email || '',
    Phone: formData.Phone || '',
  };


  const validationSchema = Yup.object().shape({
    Address: Yup.string().required('Adresse requise'),
    Email: Yup.string().email('Email invalide').required('Email requis'),
    Phone: Yup.string().required('TéléPhone requis'),
  });

  const handleSubmit = values => {
    console.error(values);
    onNextStep(values);
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
              onChangeText={handleChange('Address')}
              onBlur={handleBlur('Address')}
              value={values.Address}
              placeholder="Adresse"
            />
            {errors.Address && touched.Address && <Text>{errors.Address}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('Email')}
              onBlur={handleBlur('Email')}
              value={values.Email}
              keyboardType="email-address"
              placeholder="E-mail"
            />
            {errors.Email && touched.Email && <Text>{errors.Email}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('Phone')}
              onBlur={handleBlur('Phone')}
              value={values.Phone}
              keyboardType="phone-pad"
              placeholder="TéléPhone"
            />
            {errors.Phone && touched.Phone && <Text>{errors.Phone}</Text>}

            <View style={styles.buttonContainer}>
              <Button onPress={onPreviousStep} title="Retour" />
              <Button
                onPress={formikSubmit}
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
InscriptionStep2.propTypes = {
  onNextStep: PropTypes.func.isRequired,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default InscriptionStep2;
