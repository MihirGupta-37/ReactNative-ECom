import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';

import {Button} from '../Components/Button';
import {
  validatePassword,
  validconfPassword,
} from '../utils/Validations';
import {TextField} from '../Components/TextField';
import axios from 'axios';
import {BASE_URL, RESETPASSWORD_API} from '../utils/Constants';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const ResetPassword = props => {
  const [errors, setErrors] = useState({
    password: '',
    confPassword: '',
  });

  const fieldValues = {
    password: 'Mihir@12345678',
    confPassword: 'Mihir@12345678',
  };

  const [values, setValues] = useState(fieldValues);
  const [passVisible, setPassVisible] = useState(true);
  const [passVisible1, setPassVisible1] = useState(true);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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

  const handleRegister = () => {
    let payload = {
      otp: parseInt(value),
      password: values.password,
      confirmPassword: values.confPassword,
    };
    console.log('payload::::', payload);
    axios
      .put(BASE_URL + RESETPASSWORD_API, payload)
      .then(response => {
        console.log('Response::::::::::', response);
        props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Error::::::::::', error.response);
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
    return valid;
  };

  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    handleRegister();
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
        </View>
        <View style={styles.otpMain}>
          <CodeField
            ref={ref}
            {...prop}
           
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
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
    marginBottom: 20,
  },
  headerMain: {
    fontSize: 32,
    paddingTop: 25,
    color: 'black',
    fontWeight: '800',
  },
  subHeading: {
    textAlign: 'center',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  invalidTxt: {
    color: 'red',
  },
  invalidFieldOtp: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 40,
    alignItems: 'center',
  },
  otpMain: {
    flex: 1,
    padding: 30,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 55,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#22689f',
    textAlign: 'center',
  },
});
export default ResetPassword;
