import React from 'react';
import {
    SafeAreaView,
    Text, 
    StyleSheet,
    View
} from 'react-native';

function AboutMe(){
    return (
        <SafeAreaView>
            <View>
                <Text style = {styles.text}>About Me</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50, 
        fontWeight: 'bold',
    }
})
export default AboutMe;