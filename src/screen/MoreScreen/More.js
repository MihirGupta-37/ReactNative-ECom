import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Button} from '../../Components/Button';
import {AuthContext} from '../../Navigation/AuthContext';

export default function More(props) {
  const {signOut} = useContext(AuthContext);
  const handleLogout = () => {
    console.log('logout click');
    setTimeout(() => signOut(), 2000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.optionView,
            {borderTopColor: 'black', borderTopWidth: 2},
          ]}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('About')}
            style={styles.touchableView}>
            <Text style={styles.optionTxt}>About Us</Text>
            <Icon style={styles.optionIcon} name={'chevron-right'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Contact')}
            style={styles.touchableView}>
            <Text style={styles.optionTxt}>Contact Us</Text>
            <Icon style={styles.optionIcon} name={'chevron-right'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.optionView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('UserProfile')}
            style={styles.touchableView}>
            <Text style={styles.optionTxt}>User Profile</Text>
            <Icon style={styles.optionIcon} name={'chevron-right'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button submitForm={handleLogout} disabled={true} title="Log Out" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {},
  optionView: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 20,
    backgroundColor: '#ffff',
  },
  touchableView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionTxt: {
    fontSize: 20,
    color: '#22689f',
    fontWeight: '500',
    marginHorizontal: 15,
    fontFamily: 'SourceSansPro-SemiBoldItalic',
  },
  optionIcon: {
    fontSize: 20,
    color: '#22689f',
    fontWeight: '500',
    marginHorizontal: 15,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
