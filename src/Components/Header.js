import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const Header = () => {
  return (
    <View style={styles.headerMain}>
      <Text style={styles.headerTxt}>VShop</Text>
      <TouchableOpacity style={styles.headTouchable}>
        <Icon style={styles.iconProfile} name="account-circle"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMain: {
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    backgroundColor: '#fff',
  },
  headerTxt: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
    marginLeft: 20,
  },
  headTouchable: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 30,
  },
  iconProfile: {
    fontSize: 30,
    color: '#625D5D',
  },
});
export default Header;
