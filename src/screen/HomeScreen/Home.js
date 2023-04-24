import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Button} from '../../Components/Button';
import LocalStorage from '../../utils/LocalStorage';
import Header from '../../Components/Header';
import Images from '../../Components/Images';
import {AuthContext} from '../../Navigation/AuthContext';
import MyProducts from './MyProducts';

const Home = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    LocalStorage.getData('UserData').then(res => console.log('userData--->'));
  }, []);

  const handleLogout = () => {
    console.log('logout click');
    // AsyncStorage.clear();
    setTimeout(() => signOut(), 2000);
  };

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

  return (
    <ScrollView>
      <Header profilePress={profilePress} />
      <Images />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Our Latest Products</Text>
        </View>
        {/* <View style={styles.productMain}> */}
        <MyProducts />
        {/* <FlatList data={categoryList} renderItem={({item, index}) => {
            return (
              <TouchableOpacity style>
              </TouchableOpacity>
            )
          }}/> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button submitForm={handleLogout} disabled={true} title="Log Out" />
      </View>
      {/* </View> */}
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
    marginVertical: 15,
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
  },
});
export default Home;
