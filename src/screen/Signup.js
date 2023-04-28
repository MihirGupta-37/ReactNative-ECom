import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  validateEmail,
  validatePassword,
  validateName,
  validconfPassword,
} from '../utils/Validations';

import {Button} from '../Components/Button';
import {TextField} from '../Components/TextField';
// import axios from 'axios';
import {AuthContext} from '../Navigation/AuthContext';
import LocalStorage from '../utils/LocalStorage';
import {BASE_URL, REGISTER_API} from '../utils/Constants';
import ApiManager from '../api/ApiManager';

const Signup = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {userDetails} = useContext(AuthContext);
  const {userToken} = useContext(AuthContext);
  const fieldValues = {
    userName: '',
    email: '',
    password: '',
    confPassword: '',
  };

  const [passVisible, setPassVisible] = useState(true);
  const [passVisible1, setPassVisible1] = useState(true);
  const [values, setValues] = useState(fieldValues);
  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: '',
    confPassword: '',
  });

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};

      if (key === 'userName') {
        newValue.userName = mValue;
      } else if (key === 'email') {
        newValue.email = mValue;
      } else if (key === 'password') {
        newValue.password = mValue;
      } else {
        newValue.confPassword = mValue;
      }
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.userName = '';
      newValue.email = '';
      newValue.password = '';
      newValue.confPassword = '';
      return newValue;
    });
  };

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const userNameError = validateName(values.userName);
    const emailError = validateEmail(values.email);
    const pwdError = validatePassword(values.password);
    const confPwdError = validconfPassword(
      values.password,
      values.confPassword,
    );

    if (userNameError) {
      valErrors = {...valErrors, userName: userNameError};
      valid = false;
    }
    if (emailError) {
      valErrors = {...valErrors, email: emailError};
      valid = false;
    }
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
    e.preventDefault();
    if (!validate()) {
      return false;
    }

    handleRegister();
    return true;
  };

  const onConditionPress = () => {
    return console.warn('Presssed Condition');
  };

  const onPrivacyPress = () => {
    return console.warn('Presssed Privacy');
  };

  const iconPress = () => {
    setPassVisible(!passVisible);
  };

  const iconPress1 = () => {
    setPassVisible1(!passVisible1);
  };

  const onPressTxt = () => {
    setValues(value => {
      let newValue = {...value};

      newValue.userName = '';

      newValue.email = '';

      newValue.password = '';

      newValue.confPassword = '';

      return newValue;
    });
    props.navigation.navigate('Login');
  };

  const handleRegister = () => {
    ApiManager.PostAPI(
      '',
      {
        name: values.userName,
        email: values.email,
        password: values.password,
      },
      BASE_URL + REGISTER_API,
    )
      .then(function (response) {
        console.log('Response::::::::::', response);
        LocalStorage.saveData('UserData', response?.data);
        userDetails(response?.data);
        userToken(response?.data?.token);
        ToastAndroid.showWithGravityAndOffset(
          'Signed In Successfully!!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        props.navigation.navigate('Home');
      })
      .catch(function (error) {
        console.log('Error::::::::::', error?.response?.data?.message);
        ToastAndroid.showWithGravityAndOffset(
          error?.response?.data?.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerMain}>Create Your Account</Text>
            <Text style={styles.subHeading}>
              Join our Community to get different feedbacks and reviews about
              Products!
            </Text>
          </View>
          <TextField
            title="Full Name"
            name="userName"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.userName}
            error={errors.userName}
            onChangeText={val => {
              handleChangeText('userName', val);
            }}
            isIcon={false}
          />
          <View style={styles.invalidField}>
            {errors.userName ? (
              <Text style={styles.invalidTxt}>{errors.userName}</Text>
            ) : null}
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
            {errors?.confPassword ? (
              <Text style={styles.invalidTxt}>{errors?.confPassword}</Text>
            ) : null}
          </View>
          <View style={styles.textInputField}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={toggleCheckBox}
                onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
              />
            </View>
            <Text style={styles.inputField}>
              By Clicking Register, you agree to our
              <Text style={styles.insideText} onPress={onConditionPress}>
                {' '}
                Terms and Conditions
              </Text>{' '}
              (link to T&C) and have read our
              <Text style={styles.insideText} onPress={onPrivacyPress}>
                {' '}
                Privacy Policy
              </Text>{' '}
              (link to PP)
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              submitForm={submitForm}
              disabled={toggleCheckBox}
              title="Register"
            />
          </View>
          <View style={styles.loginInput}>
            <Text>Already Have an Account?</Text>
            <TouchableOpacity>
              <Text style={styles.loginTxt} onPress={onPressTxt}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
  },
  headerMain: {
    fontSize: 32,
    paddingVertical: 25,
    color: 'black',
    fontWeight: '800',
  },
  subHeading: {
    paddingBottom: 30,
    textAlign: 'center',
  },
  textInputField: {
    marginBottom: 15,
    width: '100%',
    paddingVertical: 15,
    textAlign: 'center',
  },
  insideText: {
    color: '#22689f',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
  textInputField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    width: '90%',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  loginInput: {
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  invalidTxt: {
    color: 'red',
    paddingBottom: 15,
  },
  loginTxt: {
    color: '#22689f',
    fontWeight: 'bold',
  },
});
export default Signup;
