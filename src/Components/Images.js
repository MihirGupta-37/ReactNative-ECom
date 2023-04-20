import React from 'react';
import {View, Image, ScrollView, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.7;
const image = [
  'https://www.levi.in/on/demandware.static/-/Sites-LeviIN-Library/en_IN/dw8e0752f4/images/homepage/Main%20Carousel/Mid%20Season%20Sale%20Desktop%201440%20X%20630.jpg',
  'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/8127cdb2-6a27-4d27-96a4-dfc7cf5e6cdb/nike-just-do-it.jpg',
  'https://imagescdn.aeo.in/img/app/brands/ae/home/AE_D_S1.jpg?w=1519&auto=format',
  'https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1681711902838/17f30690b61453c069f7927f6dfb14ac.jpg',
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
            style={{width, height, resizeMode: 'cover'}}></Image>
        ))}
      </ScrollView>
    </View>
  );
};
export default Images;
