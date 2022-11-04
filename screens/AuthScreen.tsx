import {useNavigation} from '@react-navigation/core';
import React, {SyntheticEvent, useState, ChangeEvent, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Header} from '../components';
import {RouteNames} from '../constants';
import {
  createTable,
  createUser,
  getCurrentUser,
  getDBConnection,
  TABLE_NAMES,
} from '../sqlite3/index.database';

const AuthScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [dbInstance, setDbInstance] = useState<any>(null);

  useEffect(() => {
    (async function () {
      let dbInstance = await getDBConnection();
      setDbInstance(dbInstance);

      createTable(
        dbInstance as SQLiteDatabase,
        TABLE_NAMES.user,
        `
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                bookmarks TEXT
            `,
      );

      // deleteTable(dbInstance, TABLE_NAMES.user)

      const user = await getCurrentUser(dbInstance);

      if (user) {
        navigation.replace(RouteNames.newsScreen);
      } else setIsInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.replace(RouteNames.newsScreen);
    }
  }, [user]);

  const darkMode = {color: isDarkMode ? 'white' : 'black'};

  const AuthForm: React.FC = () => {
    const [authFormValues, setAuthFormValues] = useState({
      username: '',
      password: '',
    });

    const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');

    const handleFormChange = (text: string, name: string) => {
      setAuthFormValues({...authFormValues, [name]: text});
    };

    const handleFormSubmission = async () => {
      if (authType === 'signin') {
        let user = await getCurrentUser(dbInstance);

        if (
          user?.username === authFormValues.username &&
          user?.password === authFormValues.password
        )
          setUser(user);
        else {
          setError('Invalid Login Credentials');
        }
      } else {
        await createUser(
          dbInstance,
          authFormValues.username,
          authFormValues.password,
          '',
        );

        let user = await getCurrentUser(dbInstance);
        setUser(user);
      }
    };

    return (
      <View style={styles.authFormContainer}>
        <Image
          source={
            isDarkMode ? require('../Login-dark.gif') : require('../Login.gif')
          }
          style={{width: 320, height: 320, marginBottom: 20}}
        />

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TextInput
          placeholder="Enter your username"
          style={styles.inputField}
          value={authFormValues.username}
          onChangeText={text => handleFormChange(text, 'username')}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.inputField}
          secureTextEntry={true}
          value={authFormValues.password}
          onChangeText={text => handleFormChange(text, 'password')}
        />
        <TouchableOpacity style={styles.button} onPress={handleFormSubmission}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
            {authType === 'signin' ? 'LOGIN' : 'Create an Account'}
          </Text>
        </TouchableOpacity>
        {authType === 'signup' ? (
          <View style={{flexDirection: 'row'}}>
            <Text style={[{fontSize: 16}, darkMode]}>
              Already have an account?
            </Text>
            <Text> </Text>
            <TouchableOpacity onPress={() => setAuthType('signin')}>
              <Text style={{fontSize: 16, color: '#ec6333'}}>Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={[{fontSize: 16}, darkMode]}>
              Don't have an account?
            </Text>
            <Text> </Text>
            <TouchableOpacity onPress={() => setAuthType('signup')}>
              <Text style={{fontSize: 16, color: '#ec6333'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    authFormContainer: {
      paddingHorizontal: 20,
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    inputField: {
      width: '100%',
      marginVertical: 6,
      padding: 10,
      height: 48,
      borderRadius: 8,
      borderColor: 'lightgray',
      borderWidth: 0.5,
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
    },
    button: {
      marginVertical: 15,
      backgroundColor: '#ec6333',
      padding: 10,
      borderRadius: 10,
      width: 350,
      height: 56,
      justifyContent: 'center',
    },
    errorContainer: {
      backgroundColor: '#b1633330',
      width: '100%',
      padding: 18,
      borderRadius: 8,
      marginBottom: 10,
    },
    errorText: {
      color: 'white',
      fontSize: 18,
    },
  });

  if (isInitialized) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
        <StatusBar
          backgroundColor={isDarkMode ? 'black' : 'white'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <ScrollView
          style={{flex: 1, backgroundColor: isDarkMode ? 'black' : 'white'}}>
          <Header
            title="HackerNews"
            rightIcon={
              <Pressable
                onPress={() => navigation.replace(RouteNames.newsScreen)}>
                <Text
                  style={{color: '#ec6333', fontSize: 16, fontWeight: '600'}}>
                  Later
                </Text>
              </Pressable>
            }
          />
          <AuthForm />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}>
        <ActivityIndicator color="#ec6333" />
      </View>
    );
  }
};

export default AuthScreen;
