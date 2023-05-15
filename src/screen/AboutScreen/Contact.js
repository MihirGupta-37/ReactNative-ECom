import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

export default function Contact() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerMain}>CONTACT US</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            marginVertical: 10,
            color: '#22689f',
          }}>
          Full Name
        </Text>
        <TextInput style={styles.inputField}></TextInput>

        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            marginVertical: 10,
            color: '#22689f',
          }}>
          Email
        </Text>
        <TextInput style={styles.inputField}></TextInput>

        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            marginVertical: 10,
            color: '#22689f',
          }}>
          Comment
        </Text>
        <TextInput
          style={[styles.inputField, {width: '100%', height: 200}]}></TextInput>
      </View>
    </View>
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
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
    marginBottom: 30,
  },
  inputField: {
    backgroundColor: '#FFF',
    borderColor: 'black',
    borderWidth: 2,
  },
});
