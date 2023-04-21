import React from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.7;
const image = [
  'https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg?w=1060&t=st=1682074704~exp=1682075304~hmac=https://img.freepik.com/free-vector/season-sale_62951-24.jpg?w=2000',
  'https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/6461325/pexels-photo-6461325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const Images = () => {
  return (
    <View style={{width, height}}>
      <ScrollView pagingEnabled horizontal style={{width, height}}>
        {image.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: image,
            }}
            style={{width, height, resizeMode: 'center'}}></Image>
        ))}
      </ScrollView>
    </View>
  );
};
export default Images;
