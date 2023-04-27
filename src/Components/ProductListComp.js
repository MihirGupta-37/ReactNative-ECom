import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {AirbnbRating} from 'react-native-ratings';

export default function ProductListComp({
  item,
  onTextLayout,
  lengthMore,
  onClickDetails,
  hideShowHandler,
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
            <Text onPress={() => hideShowHandler()} style={{lineHeight: 21}}>
              {item?.isReadMore ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textAreaPrice}>
            {'\u20B9'}
            {item.price}
          </Text>
          <View style={styles.ratingStar}>
            <Icon name={'star'} style={{color: '#DBA800', marginTop: 5}} />
            <Text>{item.ratings}/5</Text>
          </View>
        </View>
        <Text style={styles.productButton} onPress={() => onClickDetails()}>
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
