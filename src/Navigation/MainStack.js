import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screen/HomeScreen/Home';
import Cart from '../screen/CartScreen/Cart';
import UserProfile from '../screen/HomeScreen/UserProfile';

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
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
}
