import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MainStack from '../Navigation/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

const BottomTabs = createBottomTabNavigator();

function BottomTab() {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let labelName;
          let tabColor;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            labelName = route.name === 'Home' ? 'Home' : 'Home';
            tabColor = focused ? '#c1d5e6' : '#ffffff';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
            labelName = route.name === 'Cart' ? 'Cart' : 'Cart';
            tabColor = focused ? '#c1d5e6' : '#ffffff';
          } else if (route.name === 'More') {
            iconName = focused ? 'more-horiz' : 'more-horiz';
            labelName = route.name === 'More' ? 'More' : 'More';
            tabColor = focused ? '#c1d5e6' : '#ffffff';
          }

          return (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: tabColor,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 15,
              }}>
              <Icon name={iconName} size={size} color={color}></Icon>
              {focused && (
                <Text
                  style={{color: '#22689f', marginLeft: 5, fontWeight: 'bold'}}>
                  {labelName}
                </Text>
              )}
            </View>
          );
        },
        // tabBarActiveBackgroundColor: 'lightgray',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
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
