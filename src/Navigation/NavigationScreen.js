import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screen/Login';
import Signup from '../screen/Signup';
import Fpassword from '../screen/Fpassword';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f2f2f2',
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Fpassword"
          component={Fpassword}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f2f2f2',
            },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
