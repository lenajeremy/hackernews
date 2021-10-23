import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    ActivityIndicator,
    StyleSheet,
    useColorScheme,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { StoryType } from '../store/types';
import { getStories, newsSelector } from '../store/newsSlice';
import axios from '../axios';
import { AxiosResponse } from 'axios';
import { Skeleton, Header } from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { RouteNames } from '../constants';


function NewsScreen() {

    const [pageNumber, setPageNumber] = useState(0);
    const isDarkMode = useColorScheme() === 'dark';

    const STORIES_PER_PAGE = 10;

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false)
    const { news, errorMessage, isFetching, isSuccess } = useSelector(newsSelector);

    const loadNewStories = () => {
        dispatch(getStories(
            {
                start: (pageNumber * STORIES_PER_PAGE),
                end: (pageNumber + 1) * STORIES_PER_PAGE,
                storyType: StoryType.new,
                operation: 'new'
            }
        ));
        setPageNumber(pageNumber => pageNumber + 1);
    }

    useEffect(() => {
        loadNewStories()
    }, [])

    function _renderNews({ item: item }: { item: number }) {

        return (
            <NewsType type={StoryType.top} item={item} />
        )
    }

    function refresh() {
        setRefreshing(true);
        dispatch(getStories(
            {
                start: (pageNumber * STORIES_PER_PAGE),
                end: (pageNumber + 1) * STORIES_PER_PAGE,
                storyType: StoryType.new,
                operation: 'new'
            }
        ));
        setRefreshing(false)
    }

    function loadMoreStories() {
        if (news.length > 0) {
            dispatch(getStories(
                {
                    start: pageNumber + 1,
                    end: (pageNumber + 1) * STORIES_PER_PAGE,
                    storyType: StoryType.new,
                    operation: 'append'
                }
            ));
        }
    }

    if (!isSuccess && errorMessage) {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <Header title="HackerNews" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ width: '80%', fontSize: 18, textAlign: 'center', marginBottom: 10 }}>{errorMessage}</Text>
                    <TouchableOpacity
                        style={{ marginVertical: 10, padding: 12, borderRadius: 8, backgroundColor: '#423ef6' }}
                        onPress={loadNewStories}
                    >
                        <Text style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}>Reload</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    if (isFetching) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{ backgroundColor: isDarkMode ? '#111' : 'white', flex: 1 }}>
                <Header title="HackerNews" />
                <FlatList
                    contentContainerStyle={{
                        marginTop: 10
                    }
                    }
                    onRefresh={refresh}
                    refreshing={refreshing}
                    data={news}
                    renderItem={_renderNews}
                    onEndReached={loadMoreStories}
                    onEndReachedThreshold={0.05}
                    ListFooterComponent={<ActivityIndicator style={{ marginBottom: 30 }} />}
                />
            </SafeAreaView>
        )
    }
}

const COLORS = [
    'orange',
    'hotpink',
    'lightgreen',
    'blue',
    'green'
]


const NewsType: React.FC<{ type: StoryType, item: number }> = ({ type, item }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation()

    interface StoryItem {
        id: number,
        text: string,
        url: string,
        poster: string,
        timePosted: number,
        comments: number[],
        likes: number,
    }

    const [loaded, setLoaded] = useState(false);
    const [story, setStory] = useState<StoryItem>({
        text: '',
        url: '',
        poster: '',
        timePosted: 0,
        comments: [],
        id: item,
        likes: 0
    });

    useEffect(() => {
        const getStory = async ({ id }: { id: number }) => {

            console.log('getting', id)
            try {
                const response: AxiosResponse = await axios.get('/item/' + id + '.json')

                const story: any = response.data;

                console.log(story)

                setStory({
                    id: item,
                    text: story.title,
                    url: story.url,
                    poster: story.by,
                    timePosted: story.time,
                    comments: story.kids,
                    likes: story.score
                });

                setLoaded(true);


            } catch (error) {
                console.log(error)
                setLoaded(false)
            }
        }

        getStory({ id: item });
    }, []);

    const getTime = (time: number) => {
        const nowDate = new Date();
        const createdDate = new Date(time * 1000);

        const timeDifference = nowDate.getTime() - createdDate.getTime()

        const SECONDS = Math.round(timeDifference / 1000);
        const MINUTES = Math.round(timeDifference / (1000 * 60));
        const HOURS = Math.round(timeDifference / (1000 * 60 * 60));
        const DAYS = Math.round(timeDifference / (1000 * 60 * 60 * 24));
        const WEEKS = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7));
        const MONTHS = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7 * 4));
        const YEARS = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7 * 4 * 12));

        console.log(timeDifference)

        if (YEARS > 0) return YEARS + `yr${YEARS > 1 ? 's' : ''} ago`
        else if (MONTHS > 0) return MONTHS + `mth${MONTHS > 1 ? 's' : ''} ago`
        else if (WEEKS > 0) return WEEKS + `wk${WEEKS > 1 ? 's' : ''} ago`
        else if (DAYS > 0) return DAYS + `day${DAYS > 1 ? 's' : ''} ago`
        else if (HOURS > 0) return HOURS + `hr${HOURS > 1 ? 's' : ''} ago`
        else if (MINUTES > 0) return MINUTES + `min${MINUTES > 1 ? 's' : ''} ago`
    }

    if (loaded) {
        return (
            <TouchableOpacity style={{ marginVertical: 4 }} onPress={() => navigation.navigate(RouteNames.storyScreen, { story })}>
                <View style={styles.loadingNewsContainer}>
                    <View style={[styles.news, { backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)] }]}>
                        <Text style={styles.posterText}>{story.poster.charAt(0).concat(story.poster.charAt(1))}</Text>
                    </View>
                    <View style={{ width: '80%', }}>
                        <Text style={[styles.topText, { color: isDarkMode ? 'white' : '#111' }]}>{story?.text}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.storiesDetails, { color: isDarkMode ? 'gray' : '#333' }]}>
                                {story.poster}
                            </Text>
                            <Text style={[styles.storiesDetails, { color: isDarkMode ? 'gray' : '#333' }]}>
                                {getTime(story.timePosted)}
                            </Text>
                            <Text style={[styles.storiesDetails, { color: isDarkMode ? 'gray' : '#333' }]}>
                                {story.likes} likes
                            </Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    } else {
        return <Skeleton />
    }
}



const styles = StyleSheet.create({
    loadingNewsContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 10,
        // alignItems: 'center',
    },
    news: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    posterText: {
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase',
    },
    topText: {
        color: 'white',
        fontSize: 16
    },
    storiesDetails: {
        fontSize: 14,
        marginRight: 6,
        marginTop: 3
    }
})
export default NewsScreen