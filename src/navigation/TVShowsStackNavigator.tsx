import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import TVShowsListScreen from '../screens/TVShowsListScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const TVShowsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={TVShowsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default TVShowsStackNavigator;
