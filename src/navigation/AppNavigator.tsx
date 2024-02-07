import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieListScreen from '../screens/MovieListScreen';
import TVShowsListScreen from '../screens/TVShowsListScreen';

export type RootStackParamList = {
  Home: undefined;
  Movies: undefined;
  TVShows: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Movies" component={MovieListScreen} />
      <Stack.Screen name="TVShows" component={TVShowsListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
