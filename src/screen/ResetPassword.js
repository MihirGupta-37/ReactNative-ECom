import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {Button} from '../Components/Button';
import {validatePassword, validconfPassword} from '../utils/Validations';
import {TextField} from '../Components/TextField';

const ResetPassword = () => {
  const [errors, setErrors] = useState({
    password: '',
    confPassword: '',
  });

  const fieldValues = {
    password: '',
    confPassword: '',
  };

  const [values, setValues] = useState(fieldValues);

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};
      if (key === 'password') {
        newValue.password = mValue;
      } else {
        newValue.confPassword = mValue;
      }
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.password = '';
      newValue.confPassword = '';
      return newValue;
    });
  };

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const pwdError = validatePassword(values.password);
    const confPwdError = validconfPassword(
      values.password,
      values.confPassword,
    );
    if (pwdError) {
      valErrors = {...valErrors, password: pwdError};
      valid = false;
    }
    if (confPwdError?.length > 0) {
      valErrors = {...valErrors, confPassword: confPwdError};
      valid = false;
    }
    setErrors(valErrors);
    // console.log('12d3', valErrors);
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

  const iconPress = () => {
    setPassVisible(!passVisible);
  };

  const iconPress1 = () => {
    setPassVisible1(!passVisible1);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Reset Password</Text>
          <Text style={styles.subHeading}>
            Join our Community to get different feedbacks and reviews about
            Products!
          </Text>
        </View>

        <TextField
          title="Password"
          name="password"
          placeholder="Enter Password"
          secureTextEntry={passVisible}
          value={values.password}
          error={errors.password}
          onChangeText={val => {
            handleChangeText('password', val);
          }}
          isIcon={true}
          iconName1={'visibility'}
          iconName2={'visibility-off'}
          isIconVisible={passVisible}
          iconPress={iconPress}
        />
        <View style={styles.invalidField}>
          {errors.password ? (
            <Text style={styles.invalidTxt}>{errors.password}</Text>
          ) : null}
        </View>

        <TextField
          title="Confirm Password"
          name="confPassword"
          placeholder="Re-enter Password"
          secureTextEntry={passVisible1}
          value={values.confPassword}
          error={errors.confPassword}
          isIcon={true}
          iconName1={'visibility'}
          iconName2={'visibility-off'}
          isIconVisible={passVisible1}
          iconPress={iconPress1}
          onChangeText={val => {
            handleChangeText('confPassword', val);
          }}
        />

        <View style={styles.invalidField}>
          {errors.confPassword ? (
            <Text style={styles.invalidTxt}>{errors.confPassword}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button submitForm={submitForm} disabled={true} title="Reset" />
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
export default ResetPassword;
