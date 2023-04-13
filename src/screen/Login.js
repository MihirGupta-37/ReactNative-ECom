import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {validateEmail, validatePassword} from '../utils/Validations';

import {TextField} from '../Components/TextField';
import {Button} from '../Components/Button';

import axios from 'axios';

import LocalStorage from '../utils/LocalStorage';

const Login = props => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const fieldValues = {
    email: 'mihir3@gmail.com',
    password: 'Mihir@12345678',
  };

  const [values, setValues] = useState(fieldValues);

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};
      if (key === 'email') {
        newValue.email = mValue;
      } else {
        newValue.password = mValue;
      }
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};

      newValue.email = '';

      newValue.password = '';

      return newValue;
    });
  };

  const [passVisible, setPassVisible] = useState(true);
  const [passVisible1, setPassVisible1] = useState(true);

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const emailError = validateEmail(values.email);
    const pwdError = validatePassword(values.password);
    if (emailError) {
      valErrors = {...valErrors, email: emailError};
      valid = false;
    }
    if (pwdError) {
      valErrors = {...valErrors, password: pwdError};
      valid = false;
    }
    setErrors(valErrors);
    return valid;
  };

  const submitForm = e => {
    if (!validate()) {
      return false;
    }
    // setValues(values);
    handleRegister();
    return true;
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

      newValue.email = '';

      newValue.password = '';

      return newValue;
    });
    props.navigation.navigate('Signup');
  };

  const onPressTxt1 = () => {
    setValues(value => {
      let newValue = {...value};

      newValue.email = '';

      newValue.password = '';

      return newValue;
    });
    props.navigation.navigate('Fpassword');
  };

  const handleRegister = () => {
    axios
      .post('http://192.168.1.252:4000/api/login', {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        console.log('Response::::::::::', response);

        LocalStorage.saveData('UserData', response?.data);
        props.navigation.navigate('Home');
      })
      .catch(function (error) {
        console.log('Error::::::::::', error.response);
        ToastAndroid.showWithGravityAndOffset(
          'User already Exists!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Account Login</Text>
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
          // iconName1={'visibility'}
          // iconName2={'visibility-off'}
          // isIconVisible={passVisible}
          // iconPress={iconPress}
        />

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={values.email}
            error={errors.email}
            onChangeText={value => handleChangeText('email', value)}
          />
        </View> */}
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
        <View style={styles.buttonContainer}>
          <Button
            submitForm={submitForm}
            // disabled={toggleCheckBox}
            // styles={[{backgroundColor: toggleCheckBox ? '#22689f' : 'grey'}]}
            disabled={true}
            title="Login"
          />
        </View>
        <View style={styles.loginInput}>
          <Text>Don't Have an Account?</Text>
          <TouchableOpacity>
            <Text style={styles.loginTxt} onPress={onPressTxt}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginInput}>
          <TouchableOpacity>
            <Text style={styles.loginTxt} onPress={onPressTxt1}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
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
  label: {
    color: '#625D5D',
    fontWeight: '400',
  },
  inputContainer: {
    marginTop: 5,
    display: 'flex',
  },
  inputStyle: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingBottom: 15,
    fontSize: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  pressableBtn: {
    backgroundColor: '#22689f',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  loginInput: {
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  invalidTxt: {
    color: 'red',
  },
  loginTxt: {
    color: '#22689f',
    fontWeight: 'bold',
  },
});
export default Login;
