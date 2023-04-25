import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

export default function ProductListComp({
  item,
  onTextLayout,
  lengthMore,
  onClickDetails,
}) {
  return (
    <View style={styles.productCard}>
      <View style={styles.CardImg}>
        <Image
          source={{
            uri: item.images[0]?.url,
          }}
          style={{
            height: 150,
            width: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={styles.innerCard}>
        <View style={styles.textArea}>
          <Text
            style={styles.textAreaName}
            onTextLayout={onTextLayout}
            numberOfLines={item?.isReadMore ? null : 2}>
            {item.name}
          </Text>
          {lengthMore ? (
            <Text
              onPress={() => hideShowHandler(index)}
              style={{lineHeight: 21}}>
              {item?.isReadMore ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
        </View>
        <Text style={styles.textAreaPrice}>${item.price}</Text>
        <View style={styles.ratingStar}>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={0}
            size={15}
            ratingContainerStyle={{paddingHorizontal: 5}}
          />
          <Text style={{fontSize: 20}}>{item.ratings}</Text>
        </View>
        <Text style={styles.productButton} onPress={onClickDetails}>
          SHOP NOW
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: '47%',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginVertical: 15,
    marginHorizontal: 6,
  },
  CardImg: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCard: {
    padding: 10,
  },
  productButton: {
    marginVertical: 8,
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#22689f',
    borderBottomColor: '#22689f',
    borderBottomWidth: 2,
    borderRadius: 1,
  },
  textAreaName: {
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  textAreaPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#8B8000',
    textAlign: 'center',
  },
  ratingStar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
