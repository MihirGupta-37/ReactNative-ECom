import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screen/HomeScreen/Home';
import Cart from '../screen/CartScreen/Cart';
import UserProfile from '../screen/HomeScreen/UserProfile';
import ProductDetails from '../screen/HomeScreen/ProductDetails';
import Payment from '../screen/CartScreen/Payment';
import About from '../screen/AboutScreen/About';
import More from '../screen/MoreScreen/More';
import Contact from '../screen/AboutScreen/Contact';

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
      <AuthStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="About"
        component={About}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="More"
        component={More}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerShadowVisible: false,
        }}
      />
      <AuthStack.Screen
        name="Contact"
        component={Contact}
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
