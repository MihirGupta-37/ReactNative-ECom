import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import Image1 from '../../img/vshop_icon.png';

export default function About() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerMain}>ABOUT US</Text>
          </View>
          <View style={styles.imageView}>
            <Image
              style={{height: 250, width: 250, borderRadius: 20}}
              source={Image1}></Image>
          </View>
          <View>
            <Text style={styles.aboutView}>
              VSHOP App is a shopping app to provide customers with a convenient
              and efficient way to shop for products using their mobile devices.
              Shopping apps allow customers to browse through a variety of
              products, add them to their cart and buy it. It refers to the
              process of purchasing goods and services over the internet,
              without the need to physically visit a brick-and-mortar store.
              With the increasing use of technology and the widespread
              availability of high-speed internet, online shopping has become
              increasingly popular in recent years. Online stores can operate
              24/7, without the need for a physical storefront, and can serve
              customers from anywhere in the world. Attitude of Consumer is key
              toward online shopping, trust and the benefits seem to be the
              critical presumption of consumer behaviour toward online shopping.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  imageView: {
    alignSelf: 'center',
    marginTop: 25,
  },
  aboutView: {
    marginVertical: 20,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 25,
  },
});
