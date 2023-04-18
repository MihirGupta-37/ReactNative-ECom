import React from 'react';

import Login from '../screen/Login';
import Signup from '../screen/Signup';
import Fpassword from '../screen/Fpassword';
import Home from '../screen/HomeScreen/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
      {/* <UnAuthStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'VShop',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerShown: false,
        }}
      /> */}
    </UnAuthStack.Navigator>
  );
}
