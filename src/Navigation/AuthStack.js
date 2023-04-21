import React, {useEffect, useMemo, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalStorage from '../utils/LocalStorage';
import BottomNavigator from './BottomNavigator';
import UnAuthStack from './UnAuthStack';
import {AuthContext} from './AuthContext';

const AuthStack = props => {
  console.log('(props?.token--->', props?.token);
  const [userData, setUserData] = useState(props?.userDetails || '');
  const [token, setToken] = useState(props?.token ?? '');

  const authContext = useMemo(() => {
    return {
      userDetails: data => {
        LocalStorage.saveData('UserData', data);
        setUserData(data?.token);
      },
      signOut: () => {
        LocalStorage.ClearData();
        setToken('');
        setUserData('');
      },
      userToken: data => {
        LocalStorage.saveData('Token', data);
        setToken(data);
      },
    };
  }, []);

  const RootStack = createNativeStackNavigator();
  console.log('token---->', token);
  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator>
        {/* {userData == '' || userData?.token === ''|| */}
        {token == '' ? (
          <RootStack.Screen
            name="Login Screen"
            options={{headerShown: false}}
            component={UnAuthStack}
          />
        ) : (
          <RootStack.Screen
            name="BottomNavigator"
            options={{headerShown: false}}
            children={props => <BottomNavigator {...props} />}
          />
        )}
      </RootStack.Navigator>
    </AuthContext.Provider>
  );
};

export default AuthStack;
