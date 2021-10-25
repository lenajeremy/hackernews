import React from 'react';

import { SafeAreaView, Text, View } from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Header } from '../components';


const StoryWebViewScreen : React.FC<{route: any}> = ({route}) => {

    const navigation = useNavigation()
    const story = route.params.story;
    
    return (
        <SafeAreaView>
            <Header title = {story.text}/>
            <Text>
                {JSON.stringify(route, null, 2)}
            </Text>
            <WebView source = {story.url}/>
        </SafeAreaView>
    )
}

export default StoryWebViewScreen;