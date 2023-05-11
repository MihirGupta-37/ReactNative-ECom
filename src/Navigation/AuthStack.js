import React, {useEffect, useMemo, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalStorage from '../utils/LocalStorage';
import BottomNavigator from './BottomNavigator';
import UnAuthStack from './UnAuthStack';
import {AuthContext} from './AuthContext';

const AuthStack = props => {
  const [userData, setUserData] = useState(null);
   const authContext = useMemo(() => {
    return {
      userDetails: data => {
        LocalStorage.saveData('UserData', data);
        setUserData(data);
      },
      signOut: () => {
        LocalStorage.ClearData();
        setUserData('');
      },
    };
  }, []);

  useEffect(() => {
    setUserData(props?.userDetails);
  }, [props]);

  const RootStack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={authContext}>
       <RootStack.Navigator>
        {!userData ? (
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
