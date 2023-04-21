import React, {useState, useEffect} from 'react';

import LocalStorage from './src/utils/LocalStorage';
import AuthStack from './src/Navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  const [userDetails, setUserDetails] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    LocalStorage.getData('UserData').then(res => {
      setUserDetails(res);
    });
    LocalStorage.getData('Token').then(res => setToken(res));
  };

  return (
    <NavigationContainer>
      <AuthStack userDetails={userDetails} token={token} />
      {/* <Navigation token={token} /> */}
    </NavigationContainer>
  );
}

export default App;
