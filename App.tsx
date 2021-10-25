import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { RouteNames } from './constants';
import { Provider } from 'react-redux';
import SqliteProvider from './sqlite3/SqliteProvider';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';


/* SCREENS */
import { AboutMe, News, StoryWebView, AuthScreen } from './screens';
import store from './store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function BottomTabs() {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name='homeTab'
        component={News}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name='menu' color={focused ? 'orange' : 'gray'} />
        }}
      />
      <Tabs.Screen
        name='aboutTab'
        component={AboutMe}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons name='person' color={focused ? 'orange' : 'gray'} />
        }}
      />
    </Tabs.Navigator>
  )
}


const Component: React.FC = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const Stack = createStackNavigator()

  return (
    <SqliteProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={RouteNames.newsScreen}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name={RouteNames.newsScreen}
              component={News}
            />

            <Stack.Screen
              name={RouteNames.aboutScreen}
              component={AboutMe}
            />
<BottomTabs />

            <Stack.Screen
              name={RouteNames.storyScreen}
              component={StoryWebView}
            />
            <Stack.Screen
              name={RouteNames.authScreen}
              component={AuthScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SqliteProvider>
  )
}


export default Component