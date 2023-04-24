import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import axios from 'axios';
import LocalStorage from '../../utils/LocalStorage';
import {Rating, AirbnbRating} from 'react-native-ratings';

// let loadMore = true;

const MyProducts = props => {
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [showmore, setShowmore] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const hideShowHandler = index => {
    // categoryList[index].isReadMore = true;
    // console.log('item', id);
    // if (id) {
    // setShowmore(!showmore);

    setCategoryList(prev => {
      let newTime = [...prev];

      if (newTime[index].isReadMore) {
        newTime[index].isReadMore = false;
      } else {
        newTime[index].isReadMore = true;
      }

      // console.log('newTime:::', newTime);
      return newTime;
    });
    // setCategoryList[
    //   {...categoryList, ...(categoryList[index].isReadMore = !isReadMore)}
    // ];
    // }
  };
  console.log('categoryList:::', categoryList);
  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

  const handleRegister = () => {
    let query = `?page=${page}`;
    axios({
      method: 'get',
      url: BASE_URL + PRODUCTS_API + query,
      // url: 'https://jsonplaceholder.typicode.com/photos',
    })
      .then(response => {
        console.log('Response:::::', response.data);
        if (response.data?.products.length == 0) {
          loadMore = false;
        }
        loadMore = true;

        let arrayOfRes = response?.data?.products.map(data => {
          data['isReadMore'] = false;
          return data;
        });

        setCategoryList([...categoryList, ...arrayOfRes]);
        setPage(page + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // useMemo(() => {
  //   return(item.name.slice(0, 30).concat('...'))
  // }, [])

  useEffect(() => {
    handleRegister();
  }, []);

  const onEndReached = () => {
    if (loadMore) {
      handleRegister();
    }
  };

  return (
    <View>
      {categoryList?.length > 0 ? (
        <FlatList
          onEndReached={() => onEndReached()}
          numColumns={2}
          data={categoryList}
          renderItem={({item, index}) => (
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
                <Text style={styles.productButton}>SHOP NOW</Text>
              </View>
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

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
export default MyProducts;
