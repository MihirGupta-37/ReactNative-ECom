import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Button} from '../Components/Button';
import {validateEmail} from '../utils/Validations';
import {TextField} from '../Components/TextField';

const Fpassword = () => {
  const [errors, setErrors] = useState({
    email: '',
  });

  const fieldValues = {
    email: '',
  };

  const [values, setValues] = useState(fieldValues);

  const handleChangeText = (key, mValue) => {
    // setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values, "///");
    // if (errors[e.target.name]) {
    // setErrors({ ...errors, [e.target.name]: "" });
    // console.log(errors, "<><");
    setValues(value => {
      let newValue = {...value};
      if (key === 'email') {
        newValue.email = mValue;
      } else {
        return newValue;
      }
    });
    setErrors(value => {
      let newValue = {...value};

      newValue.email = '';

      return newValue;
    });
  };

  // console.log('values:::', errors);

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

  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    console.log('Submitted', values);
    setValues(values);
    return true;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Forgot Password</Text>
          <Text style={styles.subHeading}>
            Join our Community to get different feedbacks and reviews about
            Products and stuff!
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
          <Button
            submitForm={submitForm}
            // disabled={toggleCheckBox}
            // styles={[{backgroundColor: toggleCheckBox ? '#22689f' : 'grey'}]}
            disabled={true}
            title="Send OTP here"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
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
  },
  buttonContainer: {
    marginVertical: 20,
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  invalidTxt: {
    color: 'red',
  },
});
export default Fpassword;
