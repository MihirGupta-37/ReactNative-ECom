// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import Home from '../screen/HomeScreen/Home';
// import {NavigationContainer} from '@react-navigation/native';
// import About from '../screen/AboutScreen/About';

// export const DrawerNavigator = () => {
//   const Drawer = createDrawerNavigator();
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
//         <Drawer.Screen name="About" component={About}></Drawer.Screen>
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

function Feed() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}
