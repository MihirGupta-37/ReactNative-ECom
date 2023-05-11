import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useState} from 'react';

export const Button = props => {
  return (
    <Pressable
      onPress={props.submitForm}
      style={[
        styles.pressableBtn,
        {backgroundColor: props.disabled ? '#22689f' : 'grey'},
      ]}
      disabled={!props.disabled}>
      <Text style={styles.txtPressable}>{props.title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressableBtn: {
    backgroundColor: '#22689f',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  txtPressable: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
