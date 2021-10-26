import { useNavigation } from '@react-navigation/core';
import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    useColorScheme
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign'

interface HeaderProps {
    title: string,
    back?: boolean,
    rightIcon?: Element,
}


const Header: React.FC<HeaderProps> = ({ title, back, rightIcon }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <View style = {{flexDirection: 'row'}}>
            { back &&
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <AntDesign name='left' size={24} color={isDarkMode ? '#eee' : '#111'} />
                </TouchableOpacity>
            }
            <Text style={[styles.headerText, { color: isDarkMode ? '#eee' : '#111', fontSize: back ? 20 : 24, marginLeft: back ? 10 : 0}]}>
                {title}
            </Text>
            </View>
            {rightIcon}
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    }
})
export default Header;