import React, {useMemo, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalStorage from '../utils/LocalStorage';
import BottomNavigator from './BottomNavigator';
import UnAuthStack from './UnAuthStack';
import {AuthContext} from './AuthContext';

const AuthStack = props => {
  const [token, setToken] = useState(props?.userDetails?.token);

  const authContext = useMemo(() => {
    return {
      userDetails: data => {
        LocalStorage.saveData('UserData', data);
        setToken(data?.token);
      },
      signOut: () => {
        LocalStorage.ClearData();
        setToken('');
      },
    };
  }, []);

  const RootStack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator>
        {token === null || token === '' ? (
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
