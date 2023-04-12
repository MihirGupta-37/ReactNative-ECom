import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export const TextField = props => {
  console.log(props, 'val');
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.title}</Text>
      <View style={styles.inputContainerPwd}>
        <TextInput
          style={[styles.inputStyle, {width: '90%'}]}
          placeholder={props.placeholder}
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          secureTextEntry={props.secureTextEntry}
          autoCorrect={false}
          name={props.name}
          value={props.value}
          error={props.error}
          onChangeText={props.onChangeText}></TextInput>
        {props.isIcon && (
          <Icon
            style={[styles.iconEye, {width: '10%'}]}
            name={props.isIconVisible ? props.iconName1 : props.iconName2}
            onPress={props.iconPress}></Icon>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 15,
  },
  iconEye: {
    fontSize: 22,
    color: '#625D5D',
  },
  inputContainer: {
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    marginBottom: 15,
    paddingBottom: 5,
  },
  label: {
    color: '#625D5D',
    fontWeight: '400',
  },
  inputContainerPwd: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});
