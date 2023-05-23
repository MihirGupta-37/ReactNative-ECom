import React from 'react';
import MainStack from '../Navigation/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screen/HomeScreen/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <DrawerNavigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}></Drawer.Screen>
    </DrawerNavigator>
  );
};
