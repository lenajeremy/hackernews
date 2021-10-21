import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { StoryType } from '../store/types';
import { getStories, newsSelector } from '../store/newsSlice';
import axios from '../axios';
import { AxiosResponse } from 'axios';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SafeAreaView } from 'react-native-safe-area-context';

function NewsScreen() {

    const dispatch = useDispatch();
    const { news, errorMessage, isFetching, isSuccess } = useSelector(newsSelector);

    useEffect(() => {
        // dispatch(getStories({ start: 0, end: 10, storyType: StoryType.top }))
    }, [])

    function _renderNews({ item: item }: { item: number }) {

        return (
            <NewsType type={StoryType.top} item={item} />
        )
    }


    if (isFetching) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        )
    } else {
        return (
            <View>
                <FlatList
                    data={news}
                    renderItem={_renderNews}
                />
            </View>
        )
    }
}




const NewsType: React.FC<{ type: StoryType, item: number }> = ({ type, item }) => {

    interface StoryItem {
        title: string,
        text: string,
        url: string,
        poster: string,
        timePosted: string,
        comments: number[]
    }

    const [loaded, setLoaded] = useState(false);
    const [story, setStory] = useState<StoryItem>();

    useEffect(() => {
        const getStory = async ({ id }: { id: number }) => {

            console.log('getting', id)
            try {
                const response: AxiosResponse = await axios.get('/item/story' + id)

                const story: any = response.data;

                console.log(story)

                setStory({
                    text: story.text,
                    title: story.title,
                    url: story.url,
                    poster: story.poster,
                    timePosted: story.timePosted,
                    comments: story.comments
                });

            } catch (error) {
                console.log(error)
                setLoaded(false)
            }
        }

        // getStory({id: item});
    }, []);

    if (loaded) {
        return (
            <SafeAreaView>
                <Text>{item}</Text>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style = {{backgroundColor: 'white'}}>
                <LoadingNews />
            </SafeAreaView>
        )
    }
}


const LoadingNews: React.FC = () => {
    return (
        <View style = {{marginVertical: 10}}>
        <SkeletonPlaceholder

            backgroundColor='#c3c3c3'
            highlightColor='lightgray'
            direction='right'
            speed={2000}>
            <View style={styles.loadingNewsContainer}>
                <SkeletonPlaceholder.Item  marginVertical = {10} {...styles.news} />
                <View>
                    <SkeletonPlaceholder.Item {...styles.text} />
                    <SkeletonPlaceholder.Item {...styles.smallerText} />
                </View>
            </View>
        </SkeletonPlaceholder>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingNewsContainer: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    news: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    text: {
        width: 260,
        height: 15,
        marginBottom: 7,
        borderRadius: 20
    },
    smallerText: {
        width: 260,
        height: 9,
        borderRadius: 20,
    }
})
export default NewsScreen