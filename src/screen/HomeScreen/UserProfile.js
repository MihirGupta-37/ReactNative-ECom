import React, {useState, useContext} from 'react';
import LocalStorage from '../../utils/LocalStorage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {TextField} from '../../Components/TextField';
import {Button} from '../../Components/Button';
import {useEffect} from 'react';
// import axios from 'axios';
import {BASE_URL, PROFILE_API} from '../../utils/Constants';
import ApiManager from '../../api/ApiManager';
import {AuthContext} from '../../Navigation/AuthContext';

const UserProfile = props => {
  // const {signOut} = useContext(AuthContext);

  const [token, setToken] = useState('');
  const [values, setValues] = useState({
    userName: '',
    email: '',
  });

  // const handleLogout = () => {
  //   console.log('logout click');
  //   setTimeout(() => signOut(), 2000);
  // };

  useEffect(() => {
    handleData();
  }, []);

  const profileIconPress = () => {
    console.warn('Pressed Icon');
  };

  const handleData = () => {
    LocalStorage.getData('UserData').then(res => {
      setToken(res?.token);
      setValues(value => {
        let newValue = {...value};
        newValue.userName = res?.user?.name;
        newValue.email = res?.user?.email;
        return newValue;
      });
    });
  };

  const handleRegister = () => {
    ApiManager.PutAPI(
      token,
      {
        name: values.userName,
        email: values.email,
      },
      BASE_URL + PROFILE_API,
    )
      .then(response => {
        console.log('Response::::::::::', response);
        LocalStorage.saveData('UserData', response?.data);
        ToastAndroid.showWithGravityAndOffset(
          'Your Profile Has Been Updated',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      })
      .catch(error => {
        console.log('Error::::::::::', error.response);
      });
  };

  const submitForm = e => {
    e.preventDefault();

    handleRegister();
  };

  const handleChangeText = (key, mValue) => {
    setValues(value => {
      let newValue = {...value};

      if (key === 'userName') {
        newValue.userName = mValue;
      } else {
        newValue.email = mValue;
      }
      return newValue;
    });
  };
  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View
          style={{
            borderColor: 'lightgrey',
            borderWidth: 1,
            padding: 15,
            marginTop: 10,
          }}>
          <View style={styles.header}>
            <Text style={styles.headerMain}>User Profile</Text>
          </View>
          <View style={styles.profileIcon}>
            <TouchableOpacity onPress={profileIconPress}>
              <Icon style={styles.iconProfile} name="account-circle"></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.inputMain}>
            <TextField
              style={{fontSize: 17}}
              placeholder="Full Name"
              value={values.userName}
              isIcon={true}
              isIconVisible={true}
              iconName1={'person-outline'}
              onChangeText={val => {
                handleChangeText('userName', val);
              }}
            />

            <View style={styles.InputField}>
              <TextField
                style={{fontSize: 17}}
                placeholder="Email"
                value={values.email}
                editable={false}
                isIcon={true}
                isIconVisible={true}
                iconName1={'mail-outline'}
                onChangeText={val => {
                  handleChangeText('email', val);
                }}></TextField>
            </View>

            <Button
              submitForm={submitForm}
              disabled={true}
              title="Update"
              style={styles.buttonContainer}
            />
          </View>
          {/* <View style={styles.buttonContainer}>
          <Button submitForm={handleLogout} disabled={true} title="Log Out" />
        </View> */}
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
  headerTxt: {
    fontWeight: '600',
    fontSize: 50,
    color: '#000',
    marginLeft: 20,
  },
  iconProfile: {
    fontSize: 150,
    color: '#625D5D',
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputMain: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    alignSelf: 'center',
  },
  InputField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  IconField: {
    fontSize: 40,
    width: '20%',
    color: '#22689f',
  },
  // buttonContainer: {
  //   width: '80%',
  //   alignSelf: 'center',
  // },
});
export default UserProfile;
