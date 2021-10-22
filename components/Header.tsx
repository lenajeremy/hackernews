import React from 'react';

import { 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';


const Header : React.FC<{title: string}> = ({title}) => {
    return (
        <View style = {styles.header}>
            <Text style = {styles.headerText}>
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