import React, {useEffect, useState} from 'react';
import LocalStorage from '../../utils/LocalStorage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import {Button} from '../../Components/Button';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ApiManager from '../../api/ApiManager';
import {Loader} from '../../Components/Loader';
import Pinchable from 'react-native-pinchable';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../redux/counter/CounterSlice';

const ProductDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAddedItem, setIsAddedItem] = useState('');
  const {width} = Dimensions.get('window');
  const height = width * 0.7;

  useEffect(() => {
    LocalStorage.getData('AddToCart').then(res => {
      // console.log('res::::', res);
      if (res?.length > 0) {
        setCartItems(res);
      }
      ProductsDetailsApi(res);
    });
  }, [route?.params?.id]);

  const ProductsDetailsApi = arrayOfCart => {
    let query = `${route?.params?.id}`;
    setLoading(true);
    ApiManager.GetAPI('', BASE_URL + PRODUCTS_API + query)
      .then(response => {
        setLoading(false);
        console.log('Response-ID:::::', response?.data?.product);
        setProduct(response?.data?.product);
        ProductCheckIsAdded(arrayOfCart, response?.data?.product);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error:::::', error?.response);
      });
  };

  const ProductCheckIsAdded = (arrayOfCart, recode) => {
    const existingItem = arrayOfCart?.find(item => item?._id === recode?._id);
    setIsAddedItem(existingItem);
  };

  const submitForm = () => {
    dispatch(addToCart(product));
    // console.log('route:::', route);
    // let newArray = cartItems;
    // newArray.push(product);
    // setCartItems(newArray);
    // LocalStorage.saveData('AddToCart', newArray);
    // ProductCheckIsAdded(newArray, product);
  };

  const GoToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.header}>
          <Text style={styles.headerMain}>PRODUCT DETAILS</Text>
        </View>
        <View>
          <View style={styles.imageView}>
            <ScrollView pagingEnabled horizontal>
              {product?.images?.map(function (image, index) {
                return (
                  <Pinchable>
                    <Image
                      key={index}
                      source={{uri: image?.url ?? ''}}
                      style={{
                        width: 340,
                        height: 300,
                        resizeMode: 'contain',
                      }}
                    />
                  </Pinchable>
                );
              })}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.productCategory}>{product.category}</Text>
            <View style={styles.productHeading}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>
                {'\u20B9'}
                {product.price}
              </Text>
            </View>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.productDescription}>Ratings:</Text>
              <Icon
                name={'star'}
                style={{
                  color: '#DBA800',
                  fontSize: 20,
                  marginTop: 16,
                  marginHorizontal: 5,
                }}
              />
              <Text style={{fontSize: 15, marginTop: 15, color: 'grey'}}>
                {product.ratings}/5
              </Text>
            </View>
            <View>
              {!isAddedItem ? (
                <Button
                  title="ADD TO CART"
                  disabled={true}
                  submitForm={submitForm}
                />
              ) : (
                <Button
                  title="GO TO CART"
                  disabled={true}
                  submitForm={GoToCart}
                />
              )}
            </View>
          </View>
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
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 20,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    letterSpacing: 1,
  },
  subHeading: {
    textAlign: 'center',
  },
  imageView: {
    marginVertical: 20,
  },
  productHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCategory: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '400',
    letterSpacing: 1,
  },
  productName: {
    color: '#22689f',
    fontSize: 18,
    fontWeight: '600',
    width: '75%',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  productDescription: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 1,
    marginVertical: 15,
    color: 'grey',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B8000',
    textAlign: 'right',
    marginTop: 20,
  },
});
export default ProductDetails;
