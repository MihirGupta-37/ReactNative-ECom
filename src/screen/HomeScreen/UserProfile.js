import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {TextField} from '../../Components/TextField';
import {Button} from '../../Components/Button';

const UserProfile = props => {
  const profileIconPress = () => {
    console.warn('Pressed Icon');
  };

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>User Profile</Text>
        </View>
        <View style={styles.profileIcon}>
          <TouchableOpacity onPress={profileIconPress}>
            <Icon style={styles.iconProfile} name="account-circle"></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.inputMain}>
          <View style={styles.InputField}>
            <Icon name="person-outline" style={styles.IconField} />
            <TextInput
              style={{fontSize: 17}}
              placeholder="Full Name"></TextInput>
          </View>
          <View style={styles.InputField}>
            <Icon name="mail-outline" style={styles.IconField} />
            <TextInput style={{fontSize: 17}} placeholder="Email"></TextInput>
          </View>
          <View style={styles.InputField}>
            <Icon name="date-range" style={styles.IconField} />
            <TextInput
              style={{fontSize: 17}}
              placeholder="Joined-On"></TextInput>
          </View>
        </View>
        <View style={styles.buttonMain}>
          <Button title="My Orders" style={styles.ButtonInput}></Button>
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
    marginVertical: 15,
  },
  inputMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  InputField: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#625D5D',
  },
  IconField: {
    fontSize: 40,
    width: '20%',
    color: '#22689f',
  },
  buttonMain: {
    width: '100%',
  },
});
export default UserProfile;
