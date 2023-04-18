import React from 'react';

import Home from '../screen/HomeScreen/Home';
import Login from '../screen/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../screen/CartScreen/Cart';

export default function () {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      {/* <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      /> */}
    </AuthStack.Navigator>
  );
}
