import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native/types';
import ProductsList from '../Components/ProductsList';

export const Products = () => {
  return (
    <View style={styles.mainProducts}>
      <FlatList
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                borderWidth: 1,
                marginLeft: 10,
                borderRadius: 20,
              }}>
              <Text>{item.data}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
