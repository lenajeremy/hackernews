import { useNavigation } from '@react-navigation/core';
import React, { SyntheticEvent, useState, ChangeEvent } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    useColorScheme,
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '../components';


const AuthScreen: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();

    const darkMode = {color: isDarkMode ? '#fff': '#000'}

    const AuthForm: React.FC = () => {

        const [authFormValues, setAuthFormValues] = useState({
            username: '',
            password: '',
        });

        const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
    
        const handleFormChange = (event: SyntheticEvent<TextInput, ChangeEvent>, name: string) => {
            setAuthFormValues({ ...authFormValues, [name]: event.currentTarget.value })
        }
        return (
            <View style={styles.authFormContainer}>
                <Image source = {isDarkMode ? require('../Login-dark.gif') : require('../Login.gif')} style = {{width: 350, height: 350, marginBottom: 30}}/>

                <TextInput
                    placeholder='Enter your username'
                    style={styles.inputField}
                    value={authFormValues.username}
                    onChange={(e) => handleFormChange(e, 'username')}
                />
                <TextInput
                    placeholder='Enter your password'
                    style={styles.inputField}
                    secureTextEntry={true}
                    value={authFormValues.password}
                    onChange={(e) => handleFormChange(e, 'password')}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>{authType === 'signin' ? 'LOGIN' : 'Create an Account'}</Text>
                </TouchableOpacity>
                {
                    authType === 'signup' ?
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[{fontSize: 16}, darkMode]}>
                                Already have an account?
                            </Text>
                            <Text> </Text>
                            <TouchableOpacity onPress={() => setAuthType('signin')}>
                            <Text style = {{fontSize: 16, color: '#ec6333'}}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[{fontSize: 16}, darkMode]}>
                                Don't have an account?
                            </Text>
                            <Text> </Text>
                            <TouchableOpacity onPress = {() => setAuthType('signup')}>
                            <Text style = {{fontSize: 16, color: '#ec6333'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                }
    
            </View>
        )
    }

    const styles = StyleSheet.create({
        authFormContainer: {
            paddingHorizontal: 20,
            flex: 1,
            alignItems: 'center',
            // justifyContent: 'center',
        },
        inputField: {
            width: 330,
            marginVertical: 5,
            padding: 10,
            height: 48,
            borderRadius: 8,
            borderColor: 'lightgray',
            borderWidth: 0.5,
            fontSize: 16,
            color: isDarkMode ? 'white' : 'black'
        },
        button: {
            marginVertical: 15,
            backgroundColor: '#ec6333',
            padding: 10,
            borderRadius: 10,
            width: 330,
            height: 56,
            justifyContent: 'center'
        }
    })
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : '#fff' }}>
            <Header title = 'HackerNews'/>
            <AuthForm />
        </SafeAreaView>
    )

    
}



export default AuthScreen;