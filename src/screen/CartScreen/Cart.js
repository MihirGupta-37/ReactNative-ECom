import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Header from '../../Components/Header';
import LocalStorage from '../../utils/LocalStorage';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {numberWithCommas} from '../../utils/Validations';

const Cart = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState([]);
  useEffect(() => {
    handleCartData();
  }, []);

  const handleCartData = () => {
    LocalStorage.getData('AddToCart').then(res => {
      const newArr1 = res.map(v => ({...v, quantity: 1}));
      setAddedProduct(newArr1);
    });
  };

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

  const handleAddProduct = (item, index) => {
    const newCart = [...addedProduct];
    let value = newCart[index].quantity + 1;
    newCart[index].quantity = value;
    setAddedProduct(newCart);
  };

  const handleRemoveProduct = (item, index) => {
    const newCart = [...addedProduct];
    if (newCart[index].quantity === 1) {
    } else {
      let value = newCart[index].quantity - 1;
      newCart[index].quantity = value;
      setAddedProduct(newCart);
    }
  };

  const handleRemoveCart = item => {
    const newArray = [...addedProduct];
    const index = addedProduct.indexOf(item);
    if (index !== -1) {
      newArray.splice(index, 1);
      setAddedProduct(newArray);
      LocalStorage.saveData('AddToCart', newArray);
    }
  };

  const calculateTotal = () => {
    return addedProduct.reduce((total, item) => {
      let amount = total + item.price * item.quantity;
      return amount;
    }, 0);
  };
  // console.log('amount:::', calculateTotal());

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <View style={styles.container}>
      <Header profilePress={profilePress} />
      <View>
        <View style={styles.buynowContainer}>
          <Text style={styles.totalTxt}>
            Subtotal {'\u20B9'}
            <Text style={{fontWeight: 'bold'}}>
              {numberWithCommas(calculateTotal())}
            </Text>
          </Text>
          <Text style={{color: 'green', marginLeft: 20}}>
            <Icon name="check-circle" style={{fontSize: 15}}></Icon>
            Your order is available for FREE Delivery
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.buynowBtn}
              onPress={() => {
                navigation.navigate('Payment', {payAmount: calculateTotal()});
              }}>
              Buy Now
            </Text>
          </TouchableOpacity>
          {/* <Modal transparent visible={showModal}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalMaintxt}>
                  <Icon name="check-circle" style={{fontSize: 15}}></Icon>
                  Hooray!
                </Text>
                <Text style={{color: 'black'}}>
                  Your Order Has been Placed!
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.modalHomeBtn}>Go Back to Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
        </View>
        {addedProduct?.length > 0 ? (
          <FlatList
            data={addedProduct}
            nestedScrollEnabled={true}
            numColumns={1}
            renderItem={({item, index}) => (
              <View style={styles.cardContainer}>
                <Image
                  source={{
                    uri: item.images[0]?.url,
                  }}
                  style={{
                    height: 150,
                    width: '20%',
                    resizeMode: 'contain',
                    marginLeft: 10,
                  }}
                />
                <View style={styles.cardContent}>
                  <View style={styles.productHeading}>
                    <Text style={styles.productCategory}>{item.category}</Text>
                    <View style={{width: '88%', marginBottom: 10}}>
                      <Text style={styles.productName}>{item.name}</Text>
                    </View>
                  </View>
                  <View style={styles.mainBtnContainer}>
                    <Text style={styles.productPrice}>
                      {'\u20B9'}
                      {item.price}
                    </Text>
                    <View style={styles.btnContainer}>
                      <TouchableOpacity
                        onPress={() => handleRemoveProduct(item, index)}>
                        <Text style={styles.productQuantityBtn}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.productQuantity}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleAddProduct(item, index)}>
                        <Text style={styles.productQuantityBtn}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.lowerBtnContainer}>
                    <View style={styles.ratingStar}>
                      <Icon
                        name={'star'}
                        style={{color: '#DBA800', marginTop: 5}}
                      />
                      <Text>{item.ratings}/5</Text>
                    </View>
                    <TouchableOpacity>
                      <Icon
                        name="delete-outline"
                        onPress={() => handleRemoveCart(item)}
                        style={styles.deleteBtn}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              marginTop: 30,
              width: '71%',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <Icon
              name="shopping-bag"
              style={{
                fontSize: 100,
                color: '#22689f',
                textAlign: 'center',
              }}></Icon>
            <Text>
              <Text style={{fontSize: 25, color: 'black'}}>
                Your Cart Is Empty !
              </Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 270,
  },
  cardContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginVertical: 6,
    marginHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  productHeading: {
    marginLeft: 10,
  },
  productCategory: {
    marginTop: 5,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '400',
    width: '100%',
    marginBottom: 10,
  },
  productName: {
    color: '#22689f',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B8000',
    marginTop: 5,
    width: '35%',
    marginRight: 25,
  },
  mainBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  productQuantity: {
    backgroundColor: '#fff',
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 17,
  },
  productQuantityBtn: {
    backgroundColor: 'lightgreen',
    paddingVertical: 4.5,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingStar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    width: '60%',
  },
  deleteBtn: {
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'flex-end',
    marginHorizontal: 35,
    textAlign: 'center',
    width: '10%',
    fontSize: 15,
    borderColor: 'red',
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginBottom: 10,
  },
  buynowBtn: {
    alignSelf: 'center',
    backgroundColor: '#22689f',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
  },
  // modalView: {
  //   flex: 1,
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalContainer: {
  //   width: '80%',
  //   backgroundColor: 'white',
  //   paddingHorizontal: 20,
  //   paddingVertical: 25,
  //   borderRadius: 20,
  //   elevation: 20,
  //   borderColor: 'black',
  //   borderWidth: 5,
  // },
  // modalHomeBtn: {
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   width: '50%',
  //   textAlign: 'center',
  //   marginVertical: 10,
  //   color: 'white',
  //   padding: 5,
  //   backgroundColor: '#22689f',
  //   borderRadius: 5,
  // },
  // modalMaintxt: {
  //   color: 'green',
  //   fontSize: 20,
  // },
  // lowerBtnContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   marginTop: 10,
  // },
  totalTxt: {
    textAlign: 'left',
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginVertical: 7,
  },
  buynowContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
export default Cart;
