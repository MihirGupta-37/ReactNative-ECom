import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Button} from '../Components/Button';
import {validateEmail} from '../utils/Validations';
import {TextField} from '../Components/TextField';
import axios from 'axios';
import {BASE_URL, FORGOTPASSWORD_API} from '../utils/Constants';

const Fpassword = props => {
  const fieldValues = {
    email: 'mihirgupta63@gmail.com',
  };

  const [errors, setErrors] = useState({
    email: '',
  });

  const [values, setValues] = useState(fieldValues);

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};
      key === 'email';
      newValue.email = mValue;
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.email = '';
      return newValue;
    });
  };

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const emailError = validateEmail(values.email);
    if (emailError) {
      valErrors = {...valErrors, email: emailError};
      valid = false;
    }
    setErrors(valErrors);
    return valid;
  };

  const handleRegister = () => {
    axios
      .post(BASE_URL + FORGOTPASSWORD_API, {
        email: values.email,
      })
      .then(function (response) {
        console.log('Response::::::::::', response?.data);
        props.navigation.navigate('ResetPassword');
      })
      .catch(function (error) {
        console.log('Error::::::::::', error.response.data.message);
        ToastAndroid.showWithGravityAndOffset(
          error.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    handleRegister();
    // console.log('Submitted', values);
    // setValues(values);
    return true;
  };
  // console.log('values::::', values);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Forgot Password</Text>
          <Text style={styles.subHeading}>
            Join our Community to get different feedbacks and reviews about
            Products!
          </Text>
        </View>

        <TextField
          title="Email Address"
          name="email"
          keyboardType="email-address"
          autoCorrect={false}
          value={values.email}
          error={errors.email}
          onChangeText={val => {
            handleChangeText('email', val);
          }}
          isIcon={false}
        />
        <View style={styles.invalidField}>
          {errors.email ? (
            <Text style={styles.invalidTxt}>{errors.email}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button submitForm={submitForm} disabled={true} title="Send OTP" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 180,
  },
  headerMain: {
    fontSize: 32,
    paddingVertical: 25,
    color: 'black',
    fontWeight: '800',
  },
  subHeading: {
    textAlign: 'center',
    color: '#625D5D',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  invalidTxt: {
    color: 'red',
    paddingBottom: 15,
  },
});
export default Fpassword;
