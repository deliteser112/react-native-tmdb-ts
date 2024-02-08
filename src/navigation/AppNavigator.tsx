import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// navigators
import HomeStackNavigator from './HomeStackNavigator';
import MoviesStackNavigator from './MoviesStackNavigator';
import TVShowsStackNavigator from './TVShowsStackNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Movies"
        component={MoviesStackNavigator}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: ({ color, size }) => (
            <Icon name="movie" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV Shows"
        component={TVShowsStackNavigator}
        options={{
          tabBarLabel: 'TV Shows',
          tabBarIcon: ({ color, size }) => (
            <Icon name="tv" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
