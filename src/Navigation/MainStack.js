import React from 'react';

import Home from '../screen/HomeScreen/Home';
import Login from '../screen/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    </AuthStack.Navigator>
  );
}
