import React, { useEffect, useState } from 'react';
import { View, Text, useColorScheme, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { RouteNames } from './constants';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


/* SCREENS */
import { AboutMe, News, StoryWebView, AuthScreen } from './screens';
import store from './store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createTable, deleteTable, getCurrentUser, getDBConnection, TABLE_NAMES } from './sqlite3/index.database';
import { SQLiteDatabase } from 'react-native-sqlite-storage';


function BottomTabs() {

  const isDarkMode = useColorScheme() === 'dark'
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#111' : '#c3c3c3'
        },
      }}
    >
      <Tabs.Screen
        name='homeTab'
        component={News}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name='hacker-news' color={focused ? '#ec6333' : 'gray'} size={30} />
        }}
      />
      <Tabs.Screen
        name='aboutTab'
        component={AboutMe}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name='user' color={focused ? '#ec6333' : 'gray'} size={28} />
        }}
      />
    </Tabs.Navigator>
  )
}


const Component: React.FC = () => {

  const [db, setDb] = useState<SQLiteDatabase>();

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={RouteNames.authScreen}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={RouteNames.newsScreen}
            component={BottomTabs}
          />

          <Stack.Screen
            name={RouteNames.aboutScreen}
            component={AboutMe}
          />

          <Stack.Screen
            name={RouteNames.storyScreen}
            component={StoryWebView}
          />
          <Stack.Screen
            name={RouteNames.authScreen}
            component = {AuthScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


export default Component