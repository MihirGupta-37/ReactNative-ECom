import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

import LocalStorage from '../../utils/LocalStorage';
import Header from '../../Components/Header';
import Images from '../../Components/Images';

import {BASE_URL, PRODUCTS_API} from '../../utils/Constants';
import ProductListComp from '../../Components/ProductListComp';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ApiManager from '../../api/ApiManager';
import {Loader} from '../../Components/Loader';

const Home = ({navigation}) => {
  // const {signOut} = useContext(AuthContext);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [lengthMore, setLengthMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categoryList, setCategoryList] = useState({
    category: '',
    lowPrice: '',
    highPrice: '',
  });

  useEffect(() => {
    LocalStorage.getData('UserData').then(res => console.log('userData--->'));
    handleRegister();
  }, [page]);

  const profilePress = () => {
    navigation.navigate('UserProfile');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFilter = (key, mValue, price) => {
    setCategoryList(value => {
      let newValue = {...value};

      if (key === 'category') {
        newValue.category = mValue;
      } else if (key === 'price') {
        newValue.lowPrice = mValue;
        newValue.highPrice = price;
      } else {
        newValue.category = '';
        newValue.lowPrice = '';
        newValue.highPrice = '';
      }
      return newValue;
    });
  };

  const hideShowHandler = index => {
    setProductList(prev => {
      let newTime = [...prev];

      if (newTime[index].isReadMore) {
        newTime[index].isReadMore = false;
      } else {
        newTime[index].isReadMore = true;
      }
      return newTime;
    });
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

  const handlePageChange = isFilter => {
    if (isFilter) {
      setProductList([]);
      setPage(1);
      handleRegister(isFilter);
    } else {
      setPage(prevPage => prevPage + 1);
    }

    // handleRegister();
  };

  const handleRegister = isFilter => {
    setLoading(true);
    let query = isFilter ? `?page=${1}` : `?page=${page}`;

    let baseUrl =
      categoryList?.category !== '' && categoryList?.lowPrice === ''
        ? `${BASE_URL + PRODUCTS_API + query}${'&category='}${
            categoryList?.category
          }`
        : categoryList?.category === '' && categoryList?.lowPrice !== ''
        ? `${BASE_URL + PRODUCTS_API + query}${'&price[gte]='}${
            categoryList?.lowPrice
          }${'&price[lte]='}${categoryList?.lowPrice}`
        : categoryList?.category !== '' &&
          categoryList?.lowPrice !== '' &&
          categoryList?.highPrice !== ''
        ? `${BASE_URL + PRODUCTS_API + query}${'&category='}${
            categoryList?.category
          }${'&price[gte]='}${categoryList?.lowPrice}${'&price[lte]='}${
            categoryList?.highPrice
          }`
        : BASE_URL + PRODUCTS_API + query;
    ApiManager.GetAPI('', baseUrl)
      .then(response => {
        setLoading(false);
        const newData = response.data.products;
        console.log('Response:::::', response.data);
        if (isFilter) {
          setProductList([...newData]);
        } else {
          setProductList([...productList, ...newData]);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('Error:::::', err);
      });
  };

  const onClickDetails = item => {
    navigation.navigate('ProductDetails', {
      id: item._id,
    });
  };

  return (
    // <ScrollView>

    <View style={{flex: 1}}>
      <Header profilePress={profilePress} />
      <Images />
      <Loader loading={loading} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMain}>Our Latest Products</Text>
          <TouchableOpacity
            onPress={() => {
              // setVisible(true)
              toggleModal();
            }}>
            <Icon name={'tune'} style={styles.iconFilter} />
          </TouchableOpacity>
          <Modal transparent visible={showModal}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={{width: '10%', marginLeft: 265}}
                  onPress={() => {
                    //  setVisible(false)
                    toggleModal();
                  }}>
                  <Icon name={'close'} style={styles.iconClose}></Icon>
                </TouchableOpacity>
                <Collapse>
                  <CollapseHeader>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 22, color: 'black'}}>
                        Related Products
                      </Text>
                      <Icon
                        name={'expand-more'}
                        style={{fontSize: 22, color: 'black', marginTop: 10}}
                      />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity
                      onPress={() =>
                        handleFilter('category', `men's clothing`, '')
                      }>
                      <Text style={styles.categoryList}>Men's Clothing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() =>
                          handleFilter('category', `women's clothing`, '')
                        }>
                        Women's Clothing
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('category', `Kids`, '')}>
                        Kids
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() =>
                          handleFilter('category', `electronics`, '')
                        }>
                        Electronics
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() =>
                          handleFilter('category', `jewelery`, '')
                        }>
                        Jewelery
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() =>
                          handleFilter('category', `Footwear`, '')
                        }>
                        FootWear
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('category', `Beauty`, '')}>
                        Beauty
                      </Text>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>
                <Collapse>
                  <CollapseHeader>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      <Text style={{fontSize: 22, color: 'black'}}>
                        Category By Price
                      </Text>
                      <Icon
                        name={'expand-more'}
                        style={{fontSize: 22, color: 'black', marginTop: 10}}
                      />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('price', '0', '1500')}>
                        {'\u20B9'}0 to {'\u20B9'}1500
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('price', '1500', '5000')}>
                        {'\u20B9'}1500 to {'\u20B9'}5000
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('price', '5000', '10000')}>
                        {'\u20B9'}5000 to {'\u20B9'}10000
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text
                        style={styles.categoryList}
                        onPress={() => handleFilter('price', '10000', '')}>
                        {'\u20B9'}10000 and above
                      </Text>
                    </TouchableOpacity>
                  </CollapseBody>
                </Collapse>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      handlePageChange(true);
                      toggleModal();
                      // handleRegister();
                    }}>
                    <Text style={styles.applyBtn}>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModal();
                      handleFilter();
                    }}>
                    <Text style={styles.applyBtn}>Clear</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {productList?.length > 0 ? (
          <FlatList
            data={productList}
            nestedScrollEnabled={true}
            // keyExtractor={item => item.id}
            onEndReached={() => {
              handlePageChange();
            }}
            onEndReachedThreshold={0.1}
            numColumns={2}
            renderItem={({item, index}) => (
              <ProductListComp
                key={index}
                item={item}
                onTextLayout={onTextLayout}
                lengthMore={lengthMore}
                onClickDetails={() => onClickDetails(item)}
                hideShowHandler={() => hideShowHandler(index)}
              />
            )}
            // keyExtractor={item => item.id.toString()}
          />
        ) : null}
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button submitForm={handleLogout} disabled={true} title="Log Out" />
      </View> */}
    </View>

    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerMain: {
    fontSize: 27,
    marginVertical: 15,
    fontWeight: '800',
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 1,
    letterSpacing: 1,
  },
  categoryList: {
    padding: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 6,
    color: '#22689f',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  iconFilter: {
    marginLeft: 20,
    marginVertical: 25,
    fontSize: 27,
    color: 'black',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  iconClose: {
    fontSize: 25,
    color: 'black',
    marginBottom: 15,
  },
  applyBtn: {
    backgroundColor: '#22689f',
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 15,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'blue',
  },
  spinWrapper: {
    height: 130,
    width: 130,
  },
});
export default Home;
