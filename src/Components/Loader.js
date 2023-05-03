import React from 'react';
import {ActivityIndicator, Image, Modal, StyleSheet, View} from 'react-native';
import Image1 from '../img/progress.gif';

export const Loader = props => {
  const {loading, ...attributes} = props;

  // console.log('loading', loading);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading ? true : false}>
      <View style={styles.modalBackground}>
        <Image style={styles.spinWrapper} source={Image1}></Image>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  spinWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
