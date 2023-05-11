import React, {useState, useEffect} from 'react';
import LocalStorage from './src/utils/LocalStorage';
import AuthStack from './src/Navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {PUBLISHABLE_KEY} from './src/utils/Constants';
import Payment from './src/screen/CartScreen/Payment';

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
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <NavigationContainer>
        <AuthStack userDetails={userDetails} />
      </NavigationContainer>
    </StripeProvider>
  );
}
export default App;
