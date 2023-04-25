import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Button} from '../../Components/Button';
import LocalStorage from '../../utils/LocalStorage';
import Header from '../../Components/Header';
import Images from '../../Components/Images';
import {AuthContext} from '../../Navigation/AuthContext';
import MyProducts from './MyProducts';
import axios from 'axios';
import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import ProductListComp from '../../Components/ProductListComp';

const Home = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [showmore, setShowmore] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  useEffect(() => {
    LocalStorage.getData('UserData').then(res => console.log('userData--->'));
  }, []);

  const handleLogout = () => {
    console.log('logout click');
    // AsyncStorage.clear();
    setTimeout(() => signOut(), 2000);
  };

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

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

  const onClickDetails = () => {
    navigation.navigate('ProductDetails');
  };

  return (
    <ScrollView>
      <Header profilePress={profilePress} />
      <Images />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Our Latest Products</Text>
        </View>
        {categoryList?.length > 0 ? (
          <FlatList
            onEndReached={() => onEndReached()}
            numColumns={2}
            data={categoryList}
            renderItem={({item, index}) => (
              <ProductListComp
                key={index}
                item={item}
                onTextLayout={onTextLayout}
                lengthMore={lengthMore}
                onClickDetails={onClickDetails}
              />
            )}
          />
        ) : null}
        {/* <View style={styles.productMain}> */}
        {/* <MyProducts /> */}

        {/* <FlatList data={categoryList} renderItem={({item, index}) => {
            return (
              <TouchableOpacity style>
              </TouchableOpacity>
            )
          }}/> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button submitForm={handleLogout} disabled={true} title="Log Out" />
      </View>
      {/* </View> */}
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
    marginVertical: 15,
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
  },
});
export default Home;
