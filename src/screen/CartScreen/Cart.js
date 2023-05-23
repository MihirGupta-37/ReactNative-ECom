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
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  calculateTotalPrice,
} from '../../redux/counter/CounterSlice';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const productItems = useSelector(state => state.products.products);
  const productCount = useSelector(state => state.products.productCount);
  const total = useSelector(state => state.products.total);
  // const [addedProduct, setAddedProduct] = useState([]);
  useEffect(() => {
    handleCartData();
    dispatch(calculateTotalPrice(productItems));
  }, [dispatch, productItems]);

  const handleCartData = () => {
    LocalStorage.getData('AddToCart').then(res => {
      const newArr1 = res.map(v => ({...v, quantity: 1}));
      setAddedProduct(newArr1);
    });
  };

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

  // Adding Product through local storage method
  // const handleAddProduct = (item, index) => {
  //   const newCart = [...addedProduct];
  //   let value = newCart[index].quantity + 1;
  //   newCart[index].quantity = value;
  //   setAddedProduct(newCart);
  // };

  // Removing cart product Quantity through local storage 
  // const handleRemoveProduct = (item, index) => {
  //   const newCart = [...addedProduct];
  //   if (newCart[index].quantity === 1) {
  //   } else {
  //     let value = newCart[index].quantity - 1;
  //     newCart[index].quantity = value;
  //     setAddedProduct(newCart);
  //   }
  // };

  const handleRemoveFromCart = delID => {
    // console.log('item:::', delID);
    dispatch(removeFromCart(delID));
  };

  const handleIncrement = incID => {
    // console.log('item::::', incID);
    dispatch(incrementQuantity(incID));
  };

  const handleDecrement = decID => {
    dispatch(decrementQuantity(decID));
  };

  // const handleTotalPrice = totID => {
  //   dispatch(calculateTotalPrice(totID));
  // };

  //Remove from cart on local storage
  // const handleRemoveCart = item => {
  //   const newArray = [...addedProduct];
  //   const index = addedProduct.indexOf(item);
  //   if (index !== -1) {
  //     newArray.splice(index, 1);
  //     setAddedProduct(newArray);
  //     LocalStorage.saveData('AddToCart', newArray);
  //   }
  // };

  //Calculating Total from Local storage Method
  // const calculateTotal = () => {
  //   return addedProduct.reduce((total, item) => {
  //     let amount = total + item.price * item.quantity;
  //     return amount;
  //   }, 0);
  // };

  return (
    <View style={styles.container}>
      <Header profilePress={profilePress} />
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <View style={styles.buynowContainer}>
          <Text style={styles.totalTxt}>
            Subtotal {'\u20B9'}
            <Text style={{fontWeight: 'bold'}}>{total}</Text>
          </Text>
          <Text style={{color: 'green', marginLeft: 20}}>
            <Icon name="check-circle" style={{fontSize: 15}}></Icon>
            Your order is available for FREE Delivery
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.buynowBtn,
                {
                  backgroundColor:
                    productItems.length === 0 ? 'grey' : '#22689f',
                },
              ]}
              disabled={productItems.length === 0}
              onPress={() => {
                navigation.navigate('Payment');
              }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        {productItems?.length > 0 ? (
          <FlatList
            data={productItems}
            // data={addedProduct}
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
                        onPress={() => handleDecrement(item._id)}>
                        <Text style={styles.productQuantityBtn}>-</Text>
                      </TouchableOpacity>
                      {/* {productItems?.map(x => ( */}
                      <Text style={styles.productQuantity}>{item?.qty}</Text>
                      {/* ))} */}
                      <TouchableOpacity
                        onPress={() => handleIncrement(item._id)}>
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
                      <Text style={{color: 'grey'}}>{item.ratings}/5</Text>
                    </View>
                    <TouchableOpacity>
                      <Icon
                        name="delete-outline"
                        onPress={() => handleRemoveFromCart(item._id)}
                        style={styles.deleteBtn}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCartView}>
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
    color: 'black',
  },
  productQuantityBtn: {
    backgroundColor: '#22689f',
    paddingVertical: 4.5,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffff',
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
  emptyCartView: {
    marginTop: 30,
    width: '71%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
export default Cart;
