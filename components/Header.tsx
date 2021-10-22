import React from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    useColorScheme
} from 'react-native';


const Header : React.FC<{title: string}> = ({title}) => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style = {styles.header}>
            <Text style = {[styles.headerText, {color: isDarkMode ? 'white' : 'black'}]}>
                {title}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    }
})
export default Header;