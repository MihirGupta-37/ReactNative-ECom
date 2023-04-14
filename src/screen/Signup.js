import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
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
import Navigation from '../Navigation/NavigationScreen';
import {Button} from '../Components/Button';
import {TextField} from '../Components/TextField';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';

import LocalStorage from '../utils/LocalStorage';

const Signup = props => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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
    const confPwdError = validconfPassword(values);
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
    if (pwdError !== confPwdError) {
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

  // const handleSubmit = async (e) =>

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
    axios
      .post('http://192.168.1.252:4000/api/register', {
        name: values.userName,
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
            // iconName1={'visibility'}
            // iconName2={'visibility-off'}
            // isIconVisible={passVisible}
            // iconPress={iconPress}
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
            // iconName1={'visibility'}
            // iconName2={'visibility-off'}
            // isIconVisible={passVisible}
            // iconPress={iconPress}
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
          {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainerPwd}>
              <TextInput
                secureTextEntry={passVisible1}
                value={values.confPassword}
                error={errors.confPassword}
                onChangeText={value => handleChangeText('confPassword', value)}
              />
              <Icon
                style={[styles.iconEye, {width: '10%'}]}
                name={passVisible1 ? 'visibility' : 'visibility-off'}
                onPress={() => setPassVisible1(!passVisible1)}></Icon>
            </View>
          </View> */}
          <View style={styles.textInputField}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={toggleCheckBox}
                onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
                // tintColors={toggleCheckBox ? '#4630EB' : 'black'}
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
              // styles={[{backgroundColor: toggleCheckBox ? '#22689f' : 'grey'}]}
              title="Register"
            />
            {/* <Pressable onPress={submitForm}>
              <Text
                style={[
                  styles.pressableBtn,
                  {backgroundColor: toggleCheckBox ? '#22689f' : 'grey'},
                ]}
                disabled={!toggleCheckBox}>
                Register
              </Text>
            </Pressable> */}
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
    // alignItems : 'center',
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
  label: {
    color: '#625D5D',
    fontWeight: '400',
  },
  inputContainer: {
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingBottom: 5,
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
  inputStyle: {
    fontSize: 20,
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
  },
  loginTxt: {
    color: '#22689f',
    fontWeight: 'bold',
  },
  iconEye: {
    fontSize: 22,
    color: '#625D5D',
  },
  inputContainerPwd: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});
export default Signup;
