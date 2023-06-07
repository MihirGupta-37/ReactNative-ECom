import React, {useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import DrawerContent from './DrawerContent';
import Header from '../Components/Header';
import AuthStack from './AuthStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LocalStorage from '../utils/LocalStorage';

const Drawer = createDrawerNavigator();

export default function MainNavigation() {
  const [userDetails, setUserDetails] = useState('');

  const navigation = useNavigation();
  const drawerRef = useRef(null);

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    LocalStorage.getData('UserData').then(res => {
      setUserDetails(res);
    });
  };

  const onMenuPress = () => {
    console.log('1');
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const profilePress = () => {
    console.log('2');
    navigation.navigate('UserProfile');
  };

  const logoPress = () => {
    console.log('3');
    navigation.navigate('About');
  };

  return (
    <>
      {userDetails ? (
        <Drawer.Navigator
          screenOptions={{
            header: props => (
              <Header
                {...props}
                onMenuPress={() => onMenuPress()}
                logoPress={logoPress}
                profilePress={profilePress}
              />
            ),
          }}
          drawerContent={props => (
            <DrawerContent {...props} navigation={props.navigation} />
          )}>
          <Drawer.Screen name="Home" component={BottomNavigator} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </>
  );
}
