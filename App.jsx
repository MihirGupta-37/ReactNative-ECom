import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Navigation from './src/Navigation/NavigationScreen';
import LocalStorage from './src/utils/LocalStorage';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    LocalStorage.getData('UserData').then(res => {
      setToken(res?.token);
    });
  }, [token]);

  return <Navigation token={token} />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
