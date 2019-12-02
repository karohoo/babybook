import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
 
import HomeScreen from './src/Screens/HomeScreen';
import AddScreen from './src/Screens/AddScreen';

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
    //Defination of Navigaton from setting screen
    Add: { screen: AddScreen }
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#202020',
      },
      headerTintColor: '#FFFFFF',
      title: 'Add'
    },
  }
);
const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Add: { screen: AddStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Add') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
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