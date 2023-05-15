import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const Header = props => {
  return (
    <View style={styles.headerMain}>
      <TouchableOpacity onPress={props.logoPress}>
        <Text style={styles.headerTxt}>
          <Icon name={'shopping-bag'} style={{fontSize: 20}}></Icon>VSHOP
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headTouchable}
        onPress={props.profilePress}>
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
    color: '#22689f',
    marginLeft: 15,
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
    color: '#22689f',
  },
});
export default Header;
