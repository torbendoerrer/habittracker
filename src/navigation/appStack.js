import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/homeScreen';
import { Button } from 'react-native';
import { signOut } from '../auth/auth';

const Stack = createNativeStackNavigator();

const AppStack = () => {

  const handleLogout = async () => {
    await signOut();
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerRight: () => (
          <Button title='Logout' onPress={() => handleLogout()}></Button>
        )}} />
      {/* Füge hier weitere Bildschirme hinzu */}
    </Stack.Navigator>
  );
};

export default AppStack;