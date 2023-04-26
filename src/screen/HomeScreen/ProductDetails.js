import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import axios from 'axios';
import {Button} from '../../Components/Button';

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
  // console.log('product?.images[0]?.url;;;;;;', product?.images[0]?.url);
  useEffect(() => {
    // console.log('qqq');
    ProductsDetailsApi();
  }, [route?.params?.id]);

  // console.log('111-------->', navigation, route);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Product Details</Text>
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
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Button title="ADD TO CART" disabled={true}></Button>
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
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
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
    marginVertical: 20,
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
