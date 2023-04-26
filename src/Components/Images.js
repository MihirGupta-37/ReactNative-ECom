import React from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.7;
const image = [
  'https://img.freepik.com/free-psd/realistic-silk-fabric-mockup-psd-with-beautiful-floral-pattern_53876-114507.jpg?size=626&ext=jpg&ga=GA1.1.110083200.1681995651&semt=sph',
  'https://img.freepik.com/free-psd/color-tshirt-mockup_126278-41.jpg?w=996&t=st=1682176270~exp=1682176870~hmac=d7a1ba84aca78668a7c7c4abd2497067ad62b14464273d0440a07db484b6ae08',
  'https://imagescdn.aeo.in/img/app/brands/ae/home/AE_D_S1.jpg?w=1519&auto=format',
  'https://img.freepik.com/free-vector/winter-style-banner-with-watercolor-coat-sweater-jacket_83728-2249.jpg?size=626&ext=jpg&ga=GA1.1.110083200.1681995651&semt=sph',
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
            style={{width, height, resizeMode: 'contain'}}></Image>
        ))}
      </ScrollView>
    </View>
  );
};
export default Images;
