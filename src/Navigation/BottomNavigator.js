import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Home from '../screen/HomeScreen/Home';
import Cart from '../screen/CartScreen/Cart';
import MainStack from '../Navigation/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Cart!</Text>
    </View>
  );
}
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
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22689f',
        tabBarInactiveTintColor: 'gray',
      })}>
      <BottomTabs.Screen
        name="Home"
        options={{headerShown: true}}
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
        options={{headerShown: true}}
        children={() => <MainStack />}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();

            navigation.navigate('Cart', {screen: 'Cart'});
          },
        })}
      />
    </BottomTabs.Navigator>
  );
}

//const Tab = createBottomTabNavigator();
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

  // return (
  //   <Tab.Navigator
  //     screenOptions={({route}) => ({
  //       tabBarIcon: ({focused, color, size}) => {
  //         let iconName;

  //         if (route.name === 'Home') {
  //           iconName = focused ? 'home' : 'home';
  //         } else if (route.name === 'Cart') {
  //           iconName = focused ? 'shopping-cart' : 'shopping-cart';
  //         }

  //         return <Icon name={iconName} size={size} color={color} />;
  //       },
  //       tabBarActiveTintColor: '#22689f',
  //       tabBarInactiveTintColor: 'gray',
  //     })}>
  //     <Tab.Screen
  //       name="Home"
  //       options={{headerShown: true}}
  //       children={() => <MainStack />}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           e.preventDefault();

  //           navigation.navigate('Home', {screen: 'Home'});
  //         },
  //       })}
  //     />
  //     <Tab.Screen
  //       name="Cart"
  //       options={{headerShown: true}}
  //       children={() => <MainStack />}
  //       listeners={({navigation}) => ({
  //         tabPress: e => {
  //           e.preventDefault();

  //           navigation.navigate('Cart', {screen: 'Cart'});
  //         },
  //       })}
  //     />
  //   </Tab.Navigator>
  // );
}
