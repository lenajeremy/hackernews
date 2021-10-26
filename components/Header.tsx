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
}


const Header: React.FC<HeaderProps> = ({ title, back }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            { back &&
                <TouchableOpacity onPress = {() => navigation.goBack()}>
                    <AntDesign name='left' size={24} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
            }
            {}
            <Text style={[styles.headerText, { color: isDarkMode ? 'white' : 'black', fontSize: back ? 20 : 24, marginLeft: back ? 10 : 0}]}>
                {title}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    }
})
export default Header;