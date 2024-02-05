import React,{useState} from 'react';
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
import VerifyEmail from '../../../components/VerifyEmail';
import VerifyPhone from '../../../components/VerifyPhone';
import PhoneCodePicker from '../../../components/PhoneCodePicker';

const InscriptionStep3 = ({onNextStep, onPreviousStep,formData}) => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerificationMessage, setPhoneVerificationMessage] = useState('');



  const initialValues = {
    Email: formData.Email || '',
    Phone: formData.Phone || '',
  };


  const validationSchema = Yup.object().shape({

    Email: Yup.string().email('Email invalide').required('Email requis'),
    Phone: Yup.string().required('TéléPhone requis'),
  });

const handleEmailVerification = (isAvailable, message) => {
  setEmailVerified(isAvailable);
  setEmailVerificationMessage(message);
};

const handlePhoneVerification = (phoneNumber, isAvailable, message) => {
  setPhoneVerified(isAvailable);
  setPhoneVerificationMessage(message);
};

const handleSubmit = (values, {setSubmitting}) => {
  if (emailVerified && phoneVerified) {
    // Appeler onNextStep ici avec les valeurs du formulaire comme argument
    onNextStep(values);
  } else {
    alert(
      emailVerificationMessage ||
        phoneVerificationMessage ||
        'Vérification requise.',
    );
  }
  setSubmitting(false);
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
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => (
          <View>
            <View style={styles.Email}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
                keyboardType="email-address"
                placeholder="E-mail"
              />
              {errors.Email && touched.Email && <Text>{errors.Email}</Text>}
              <VerifyEmail
                email={values.Email}
                onVerification={handleEmailVerification}
              />
              {!emailVerified && <Text>{emailVerificationMessage}</Text>}
            </View>
            <View style={styles.Phone}>
              <PhoneCodePicker
                onPhoneVerification={phoneNumber => {
                  setFieldValue('Phone', phoneNumber);
                }}
              />
              {errors.Phone && touched.Phone && <Text>{errors.Phone}</Text>}
              <VerifyPhone
                phone={values.Phone}
                onVerification={(isAvailable, message) => {
                  handlePhoneVerification(values.Phone, isAvailable, message);
                }}
              />
            </View>
            {!phoneVerified && <Text>{phoneVerificationMessage}</Text>}

            <View style={styles.buttonContainer}>
              <Button onPress={onPreviousStep} title="Retour" />
              <Button
                onPress={formikSubmit}
                title="Suivant"
                disabled={!emailVerified || !phoneVerified}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
InscriptionStep3.propTypes = {
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

export default InscriptionStep3;
