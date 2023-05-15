import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MainStack from '../Navigation/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const BottomTabs = createBottomTabNavigator();

function BottomTab() {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'More') {
            iconName = focused ? 'more-horiz' : 'more-horiz';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 55,
        },
        tabBarActiveTintColor: '#22689f',
        tabBarInactiveTintColor: 'gray',
      })}>
      <BottomTabs.Screen
        name="Home"
        options={{headerShown: false}}
        children={() => <MainStack />}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Home', {screen: 'Home'});
          },
        })}
      />
      <BottomTabs.Screen
        name="Cart"
        options={{headerShown: false}}
        children={() => <MainStack />}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Cart', {screen: 'Cart'});
          },
        })}
      />
      <BottomTabs.Screen
        name="More"
        options={{headerShown: false}}
        children={() => <MainStack />}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('More', {screen: 'More'});
          },
        })}
      />
    </BottomTabs.Navigator>
  );
}

export default function BottomNavigator() {
  const BottomTabStack = createNativeStackNavigator();

  return (
    <BottomTabStack.Navigator>
      <BottomTabStack.Screen
        name="TabScreen"
        options={{headerShown: false}}
        component={BottomTab}
      />
    </BottomTabStack.Navigator>
  );
}
