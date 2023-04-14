import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import UnAuthStack from './UnAuthStack';
import LocalStorage from '../utils/LocalStorage';

const Navigation = props => {
  const Stack = createNativeStackNavigator();
  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   LocalStorage.getData('UserData').then(res => {
  //     setToken(res?.token);
  //   });
  // }, [token]);

  console.log('token--->navigation', props?.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!props?.token && props?.token ? (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={MainStack}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={UnAuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
