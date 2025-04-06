import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/homeScreen';
import { Button } from 'react-native';
import { signOut } from '../services/authService';
import CreateHabitScreen from '../screens/createHabit/createHabitScreen';

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
      <Stack.Screen name="CreateHabit" component={CreateHabitScreen}/>
    </Stack.Navigator>
  );
};

export default AppStack;