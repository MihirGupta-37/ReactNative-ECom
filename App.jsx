import React, {useState, useEffect} from 'react';
import LocalStorage from './src/utils/LocalStorage';
import AuthStack from './src/Navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
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
    <NavigationContainer>
      <AuthStack userDetails={userDetails} />
    </NavigationContainer>
  );
}
export default App;
