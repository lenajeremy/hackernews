import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Header } from '../components';
import Octicons from 'react-native-vector-icons/Octicons';
import { StoryItem } from './News';


const StoryWebViewScreen: React.FC<{ route: any }> = ({ route }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation()
    const story = route.params.story as StoryItem;

    const darkMode = { color: isDarkMode ? 'white' : 'black' }

    const StoryWebView = () => {
        return (
            <WebView
                source={{ uri: story.url }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
        )
    }

    const StoryDetailsSection: React.FC<{ story: StoryItem }> = ({ story }) => {
        return (
            <View style={styles.storyDetailsContainer}>
                <Text style={[darkMode, styles.storyTitle]}>{story.text}</Text>
                <Text style = {{color: 'gray', fontSize: 18, marginVertical: 8, marginBottom: 14}}>Author : {story.poster}</Text>
                <View style = {{flexDirection: 'row'}}>
                    <View style={styles.storyDetail}>
                        <Octicons name='thumbsup' size={18} color={darkMode.color} />
                        <Text style={[darkMode, {fontSize: 18, marginLeft: 5}]}>{story.likes}</Text>
                    </View>
                    <View style={styles.storyDetail}>
                        <Octicons name='comment-discussion' size={18} color={darkMode.color} />
                        <Text style={[darkMode, {fontSize: 18, marginLeft: 5}]}>{story.comments?.length || 0}</Text>
                    </View>
                    <View style={styles.storyDetail}>
                        <Octicons name='bookmark' size={18} color={darkMode.color} />
                        <Text style={[darkMode, {fontSize: 18, marginLeft: 5}]}>{story.likes}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.mainScreenContainer, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            <Header back={true} title={`Story by ${story.poster}`} />
            <StoryWebView />
            <StoryDetailsSection story={story} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainScreenContainer: {
        flex: 1,
        alignSelf: 'stretch',
    },
    storyDetailsContainer: {
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    storyTitle: {
        backgroundColor: 'transparent',
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '600',
    },
    storyDetails: {
        fontSize: 16,
    },
    storyDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
    }

})
export default StoryWebViewScreen;