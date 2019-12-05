import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
 
import HomeScreen from './src/Screens/HomeScreen';
import AddScreen from './src/Screens/AddScreen';
import MemoryScreen from './src/Screens/MemoryScreen';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
      },
      headerTintColor: '#FFFFFF',
      title: 'Home'
    },
  }
);
const AddStack = createStackNavigator(
  {
    Add: { screen: AddScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
      },
      headerTintColor: '#FFFFFF',
      title: 'Add'
    },
  }
);
const MemoryStack = createStackNavigator(
  {
    Memory: { screen: MemoryScreen }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#202020',
      },
      headerTintColor: '#FFFFFF',
      title: 'Memories'
    },
  }
);
const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Add: { screen: AddStack },
    Memory: { screen: MemoryStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
        } else if (routeName === 'Add') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Memory') {
          iconName = `ios-image`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#202020',
      inactiveTintColor: '#787878',
    },
  }
);
export default createAppContainer(App);