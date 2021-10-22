import React from 'react';

import { SafeAreaView, Text, View } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { Header } from '../components';


const StoryWebViewScreen : React.FC<{route: any}> = ({route}) => {

    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <Header title = {route.params.story.text}/>
            <Text>
                {JSON.stringify(route, null, 2)}
            </Text>
            {/* <WebView source = {route.params.story.url}/> */}
        </SafeAreaView>
    )
}

export default StoryWebViewScreen;