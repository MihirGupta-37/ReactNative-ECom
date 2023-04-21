import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import axios from 'axios';
import LocalStorage from '../../utils/LocalStorage';

const MyProducts = () => {
  const [categoryList, setCategoryList] = useState([]);

  const handleRegister = () => {
    axios({
      method: 'get',
      url: BASE_URL + PRODUCTS_API,
    })
      .then(response => {
        console.log(response.data);
        setCategoryList(response.data?.products);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleRegister();
  }, []);

  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 22}}>My Product</Text>
      {categoryList.length > 0 ? (
        <FlatList
          data={categoryList}
          renderItem={({item}) => (
            <View style={styles.productCard}>
              <Image
                source={{
                  uri: item.images[0]?.url,
                }}
                style={{height: 150, width: 150, resizeMode: 'center'}}
              />

              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.ratings}</Text>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: 200,
    height: 200,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
});
export default MyProducts;
