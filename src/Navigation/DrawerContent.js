import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

function DrawerContent({navigation}) {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <DrawerContentScrollView>
      <TouchableOpacity onPress={navigateToHome}>
        <View style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Home</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = {
  drawerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default DrawerContent;
