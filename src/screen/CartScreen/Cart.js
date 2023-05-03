import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../Components/Header';
import LocalStorage from '../../utils/LocalStorage';

const Cart = ({navigation}) => {
  const [addedProduct, setAddedProduct] = useState([]);

  useEffect(() => {
    handleCartData();
  }, []);

  const handleCartData = () => {
    LocalStorage.getData('AddToCart').then(res => {
      setAddedProduct(res);
    });
  };
  console.log('addedProduct:::', addedProduct);

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

  return (
    // <ScrollView>
    <View style={styles.container}>
      <Header profilePress={profilePress} />
      <View>
        <View style={styles.header}>
          <Text style={styles.headerMain}>My Cart</Text>
        </View>
        <View>
          <FlatList
            data={addedProduct}
            nestedScrollEnabled={true}
            numColumns={1}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <Image
                  source={{
                    uri: item.images[0]?.url,
                  }}
                  style={{
                    height: 150,
                    width: '20%',
                    resizeMode: 'contain',
                  }}
                />
                <View style={styles.productHeading}>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <Text style={styles.productName}>{item.name}</Text>
                  <View style={styles.mainBtnContainer}>
                    <Text style={styles.productPrice}>
                      {'\u20B9'}
                      {item.price}
                    </Text>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity>
                        <Text style={styles.productQuantityBtn}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.productQuantity}>1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.productQuantityBtn}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* <Text style={{color: 'black'}}>{item.name}</Text> */}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
    // {/* </ScrollView> */}
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
    color: 'black',
  },
  cardContainer: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginVertical: 15,
    marginHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  productHeading: {
    marginLeft: 10,
  },
  productCategory: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '400',
    letterSpacing: 1,
    width: 100,
  },
  productName: {
    color: '#22689f',
    fontSize: 15,
    fontWeight: '600',
    width: '75%',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B8000',
    textAlign: 'left',
    marginTop: 20,
    width: '20%',
  },
  mainBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '75%',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
  productQuantity: {
    backgroundColor: '#fff',
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 5.5,
    paddingHorizontal: 17,
  },
  productQuantityBtn: {
    backgroundColor: 'lightgreen',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default Cart;
