import React from 'react';

import Login from '../screen/Login';
import Signup from '../screen/Signup';
import Fpassword from '../screen/Fpassword';
import ResetPassword from '../screen/ResetPassword';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/HomeScreen/Home';

export default function () {
  const UnAuthStack = createNativeStackNavigator();
  return (
    <UnAuthStack.Navigator>
      <UnAuthStack.Screen
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

      <UnAuthStack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />

      <UnAuthStack.Screen
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
      <UnAuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      {/* <UnAuthStack.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShown: false,
        }}
      /> */}
    </UnAuthStack.Navigator>
  );
}
