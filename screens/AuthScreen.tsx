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
                <Text style={[styles.authFormText, darkMode]}>{authType === 'signin' ? 'Login' : 'Sign Up'}</Text>
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
                            <Text style = {{fontSize: 16, color: 'orange'}}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {[{fontSize: 16}, darkMode]}>
                                Don't have an account?
                            </Text>
                            <Text> </Text>
                            <TouchableOpacity onPress = {() => setAuthType('signup')}>
                            <Text style = {{fontSize: 16, color: 'orange'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                }
    
            </View>
        )
    }

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : '#fff' }}>
            <Header title = 'HackerNews'/>
            <AuthForm />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    authFormContainer: {
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    authFormText: {
        marginBottom: 50,
        fontSize: 30,
    },
    inputField: {
        width: 330,
        marginVertical: 10,
        padding: 10,
        height: 48,
        borderRadius: 8,
        borderColor: 'gray',
        borderWidth: 0.5,
        fontSize: 16,
        color: 'white'
    },
    button: {
        marginVertical: 15,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        width: 330,
        height: 56,
        justifyContent: 'center'
    }
})
export default AuthScreen;