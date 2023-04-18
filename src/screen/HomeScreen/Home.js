import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from '../../Components/Button';
import LocalStorage from '../../utils/LocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigator from '../../Navigation/BottomNavigator';
import Header from '../../Components/Header';
import Images from '../../Components/Images';

const Home = props => {
  useEffect(() => {
    LocalStorage.getData('UserData').then(res => console.log('userData--->'));
  }, []);

  const handleLogout = () => {
    console.log('logout click');
    AsyncStorage.clear();
    setTimeout(() => props.navigation.navigate('Login'), 2000);
  };

  // const handleRegister = () => {
  //   axios
  //     .post(BASE_URL + REGISTER_API, {
  //       name: values.userName,
  //       email: values.email,
  //       password: values.password,
  //     })
  //     .then(function (response) {
  //       console.log('Response::::::::::', response);

  //       LocalStorage.saveData('UserData', response?.data);
  //       props.navigation.navigate('Home');
  //     })
  //     .catch(function (error) {
  //       console.log('Error::::::::::', error.response);
  //       ToastAndroid.showWithGravityAndOffset(
  //         'User already Exists!',
  //         ToastAndroid.LONG,
  //         ToastAndroid.BOTTOM,
  //         25,
  //         50,
  //       );
  //     });
  // };

  // const [dataList, setDataList] = useState([]);

  return (
    <ScrollView>
      <Header />
      <Images />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Home</Text>
          <Text style={styles.subHeading}>
            Join our Community to get different feedbacks and reviews about
            Products!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button submitForm={handleLogout} disabled={true} title="Log Out" />
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
  },
  headerMain: {
    fontSize: 32,
    paddingVertical: 25,
    fontWeight: '800',
    color: 'black',
  },
  subHeading: {
    textAlign: 'center',
    color: '#625D5D',
  },
});
export default Home;
