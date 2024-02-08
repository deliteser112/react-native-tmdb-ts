import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import MovieListScreen from '../screens/MovieListScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={MovieListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
