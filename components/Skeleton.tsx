import React from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useAnimatedGestureHandler,
    useSharedValue
} from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Skeleton: React.FC = () => {

    const handleGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: (event, context) =>{
            
        }
    })
    return (
        <PanGestureHandler onGestureEvent = {handleGestureEvent}>
            <View style={{ marginVertical: 4 }}>
                <SkeletonPlaceholder
                    backgroundColor='#c3c3c3'
                    highlightColor='#eee'
                    direction='right'
                    speed={2000}>
                    <View style={styles.loadingNewsContainer}>
                        <SkeletonPlaceholder.Item marginVertical={10} {...styles.news} />
                        <View style={{ flex: 1 }}>
                            <SkeletonPlaceholder.Item {...styles.text} />
                            <SkeletonPlaceholder.Item {...styles.smallerText} />
                        </View>
                    </View>
                </SkeletonPlaceholder>
            </View>
        </PanGestureHandler>

    )
}

const styles = StyleSheet.create({
    loadingNewsContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    news: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 15,
    },
    text: {
        width: '100%',
        height: 20,
        marginBottom: 5,
        borderRadius: 5
    },
    smallerText: {
        width: '100%',
        height: 10,
        borderRadius: 20,
    }
})

export default Skeleton;