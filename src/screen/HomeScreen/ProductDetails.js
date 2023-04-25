import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../Components/Header';

const ProductDetails = ({navigation, route}) => {
  console.log('111-------->', navigation, route);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Product Details</Text>
          <Text style={styles.subHeading}>
            Join our Community to get different feedbacks and reviews about
            Products!
          </Text>
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
  },
});
export default ProductDetails;
