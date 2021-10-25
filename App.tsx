import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { RouteNames } from './constants';
import { Provider } from 'react-redux';


/* SCREENS */
import { AboutMe, News, StoryWebView } from './screens';
import store from './store';


const Component: React.FC = () => {

  const Stack = createStackNavigator()

  return (
    <Provider store = {store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteNames.newsScreen}
        screenOptions={{
          headerShown : false,
        }}
      >
        <Stack.Screen
          name={RouteNames.newsScreen}
          component={News}
        />

        <Stack.Screen
          name = {RouteNames.aboutScreen}
          component = {AboutMe}
        />

        <Stack.Screen
          name = {RouteNames.storyScreen}
          component = {StoryWebView}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default Component