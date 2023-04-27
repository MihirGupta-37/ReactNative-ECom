import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {Button} from '../../Components/Button';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ProductDetails = ({navigation, route, item}) => {
  const [product, setProduct] = useState('');

  const {width} = Dimensions.get('window');
  const height = width * 0.7;

  const ProductsDetailsApi = () => {
    let query = `${route?.params?.id}`;
    console.log('id::::', route);
    axios({
      method: 'get',
      url: BASE_URL + PRODUCTS_API + query,
    })
      .then(response => {
        console.log('Response-ID:::::', response?.data?.product);
        setProduct(response?.data?.product);
      })
      .catch(error => {
        console.log('Error:::::', error?.response);
      });
  };
  console.log('product?.images[0]?.url;;;;;;', product);
  useEffect(() => {
    // console.log('qqq');
    ProductsDetailsApi();
  }, [route?.params?.id]);

  // console.log('111-------->', navigation, route);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>PRODUCT DETAILS</Text>
        </View>
        <View>
          <View style={styles.imageView}>
            <ScrollView pagingEnabled horizontal>
              {product?.images?.map(function (image, index) {
                return (
                  <Image
                    key={index}
                    source={{uri: image?.url ?? ''}}
                    style={{
                      width: 392,
                      height: 300,
                      resizeMode: 'contain',
                    }}
                  />
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
              <Text style={{fontSize: 15, marginTop: 15}}>
                {product.ratings}/5
              </Text>
            </View>
            <View>
              <Button title="ADD TO CART" disabled={true}></Button>
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
