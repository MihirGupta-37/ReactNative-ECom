import React, {useState, useEffect} from 'react';
import LocalStorage from './src/utils/LocalStorage';
import AuthStack from './src/Navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUBLISHABLE_KEY} from './src/utils/Constants';
import Payment from './src/screen/CartScreen/Payment';
import {Provider} from 'react-redux';
import store from './src/redux/store/Store';

function App() {
  const [userDetails, setUserDetails] = useState('');
  useEffect(() => {
    handleData();
  }, []);
  const handleData = () => {
    LocalStorage.getData('UserData').then(res => {
      setUserDetails(res);
    });
  };
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
        <NavigationContainer>
          <AuthStack userDetails={userDetails} />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
export default App;
