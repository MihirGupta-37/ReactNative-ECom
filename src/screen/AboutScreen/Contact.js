import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../../Components/Button';
import {
  validateComment,
  validateEmail,
  validateName,
} from '../../utils/Validations';

export default function Contact() {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    Comment: '',
  });

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    Comment: '',
  });

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};

      if (key === 'userName') {
        newValue.userName = mValue;
      } else if (key === 'email') {
        newValue.email = mValue;
      } else {
        newValue.Comment = mValue;
      }
      return newValue;
    });
    setErrors(value => {
      let newValue = {...value};
      newValue.userName = '';
      newValue.email = '';
      newValue.Comment = '';
      return newValue;
    });
  };

  const validate = () => {
    let valErrors = {...errors};
    let valid = true;

    const userNameError = validateName(values.userName);
    const emailError = validateEmail(values.email);
    const CommentError = validateComment(values.Comment);

    if (userNameError) {
      valErrors = {...valErrors, userName: userNameError};
      valid = false;
    }
    if (emailError) {
      valErrors = {...valErrors, email: emailError};
      valid = false;
    }
    if (CommentError) {
      valErrors = {...valErrors, Comment: CommentError};
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
    console.log('Values:::::', values);
    return true;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>CONTACT US</Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.labelName}>Full Name</Text>
          <TextInput
            name="userName"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.userName}
            error={errors.userName}
            onChangeText={val => {
              handleChangeText('userName', val);
            }}
            style={styles.inputField}></TextInput>
          <View style={styles.invalidField}>
            {errors.userName ? (
              <Text style={styles.invalidTxt}>{errors.userName}</Text>
            ) : null}
          </View>

          <Text style={styles.labelName}>Email</Text>
          <TextInput
            name="email"
            keyboardType="email-address"
            autoCorrect={false}
            value={values.email}
            error={errors.email}
            onChangeText={val => {
              handleChangeText('email', val);
            }}
            style={styles.inputField}></TextInput>
          <View style={styles.invalidField}>
            {errors.email ? (
              <Text style={styles.invalidTxt}>{errors.email}</Text>
            ) : null}
          </View>

          <Text style={styles.labelName}>Comment your Query</Text>
          <TextInput
            name="Comment"
            autoCorrect={false}
            value={values.Comment}
            error={errors.Comment}
            onChangeText={val => {
              handleChangeText('Comment', val);
            }}
            multiline={true}
            style={[
              styles.inputField,
              {width: '93%', height: 200},
            ]}></TextInput>
          <View style={styles.invalidField}>
            {errors.Comment ? (
              <Text style={styles.invalidTxt}>{errors.Comment}</Text>
            ) : null}
          </View>

          <View style={styles.buttonView}>
            <Button submitForm={submitForm} disabled={true} title="Submit" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerMain: {
    fontSize: 27,
    // fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
    marginBottom: 30,
    fontFamily: 'Roboto-BlackItalic',
  },
  inputField: {
    backgroundColor: '#FFF',
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginBottom: 15,
    borderRadius: 10,
    width: '93%',
    alignSelf: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  labelName: {
    fontSize: 18,
    marginLeft: 10,
    marginVertical: 10,
    color: '#22689f',
    fontWeight: '500',
    fontFamily: 'Roboto-MediumItalic',
  },
  buttonView: {
    width: '93%',
    alignSelf: 'center',
  },
  invalidField: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 18,
  },
  invalidTxt: {
    color: 'red',
    paddingBottom: 15,
  },
});
