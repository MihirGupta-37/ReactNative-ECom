import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store/Store';
import LocalStorage from './src/utils/LocalStorage';
import AuthStack from './src/Navigation/AuthStack';
import {PUBLISHABLE_KEY} from './src/utils/Constants';
import BottomNavigator from './src/Navigation/BottomNavigator';
import DrawerContent from './src/Navigation/DrawerContent';
import Header from './src/Components/Header';
import MainNavigation from './src/Navigation/MainNavigation';

// const Drawer = createDrawerNavigator();

function App() {
  // const [userDetails, setUserDetails] = useState('');

  // const onMenuPress = () => {
  //   navigation.toggleDrawer();
  // };

  // const profilePress = () => {
  //   navigation.navigate('UserProfile');
  // };

  // const logoPress = () => {
  //   navigation.navigate('About');
  // };

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}

export default App;
