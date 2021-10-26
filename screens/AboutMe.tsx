import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    StatusBar,
    useColorScheme,
    Image,
    useWindowDimensions,
    Pressable
} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';


function AboutMe() {

    const isDarkMode: boolean = useColorScheme() === 'dark';
    const [currentDotIndex, setCurrentDotIndex] = useState(0);
    const { width, height } = useWindowDimensions()

    const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, <Slide6 />]


    const AnimatedStatusDots: React.FC<{ index: number }> = ({ index }) => {

        const dotWidth = useSharedValue(currentDotIndex <= index ? 0 : 100);

        const animatedStyle = useAnimatedStyle(() => {
            return {
                width: dotWidth.value + '%'
            }
        });

        if (currentDotIndex === index) {
            dotWidth.value = withTiming(
                100,
                { duration: 6000 },
                (completed) => {
                    if (completed) {
                        runOnJS(setCurrentDotIndex)(currentDotIndex === index - 1 ? 0 : currentDotIndex+ 1)
                    }
                }
            );
        }

        return (
            <View style={styles.animatedDot}>
                <Animated.View style={[{ backgroundColor: 'white', flex: 1, borderRadius: 20 }, animatedStyle]} />
            </View>
        )
    }

    const handleStatusChange = (e) => {
        const horizontalPosition = Math.floor(e.nativeEvent.pageX);
        if (horizontalPosition > width / 2) {
            setCurrentDotIndex(currentDotIndex === slides.length - 1 ? 0 : currentDotIndex + 1);
        } else {
            setCurrentDotIndex(currentDotIndex === 0 ? currentDotIndex : currentDotIndex - 1)
        }
    }

    return (
        <View style={{ backgroundColor: 'lightgreen', flex: 1 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={styles.animatedDotsContainer}>
                {Array(slides.length).fill(null).map((_, index) => <AnimatedStatusDots key={index} index={index} />)}
            </View>
            <View style={[{ backgroundColor:'lightgreen'}, styles.mainContainer]}>
                <Pressable onPress={handleStatusChange} style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                    {slides[currentDotIndex]}
                </Pressable>
            </View>
        </View>
    )
}

const Slide2 = () => {
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../me.jpg')} style={{ flex: 1 }} resizeMode='cover' />
        </View>
    )
}
const Slide1 = () => {
    return (
        <View style={styles.presentationTextContainer}>
            <Text style ={styles.presentationText}>Hi😎! I'm Jeremiah. I'm a frontend developer</Text>
        </View>
    )
}
const Slide3 = () => {
    return (
        <View style={styles.presentationTextContainer}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', marginVertical: 30}}>
                <Image source = {require('../react.png')} style = {{width: 150, height: 150}}/>
            </View>
            <Text style ={[styles.presentationText, {fontSize: 30}]}>I love building beautiful and interesting mobile and web applications</Text>
        </View>
    )
}

const Slide4 = () => {
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../me2.jpg')} style={{ flex: 1 }} resizeMode='cover' />
        </View>
    )
}

const Slide5 = () => {
    return (
        <View style={styles.presentationTextContainer}>
            <Text style = {[styles.presentationText, {fontSize: 100}]}>🤪😋</Text>
            <Text style ={styles.presentationText}>I love meeting new people and eating good food.</Text>
        </View>
    )
}

const Slide6 = () => {
    return (
        <View style={[styles.presentationTextContainer, {backgroundColor: 'transparent'}]}>
            <Image source = {require('../meme.jpg')} style = {styles.meme}/>
            <Text style ={styles.presentationText}>Thanks for using my app👌</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    animatedDotsContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        height: 6,
        borderRadius: 20,
        top: 45,
        zIndex: 1
    },
    animatedDot: {
        flex: 1,
        backgroundColor: 'lightgray',
        marginHorizontal: 4,
        borderRadius: 20,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    presentationText: {
        fontSize: 40,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    presentationTextContainer: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#a34caf',
        padding: 20,
        justifyContent: 'center',
        width: '100%'
    },
    meme: {
        position: 'absolute',
        top: 140,
        right: -20,
        transform: [
            {scale: 0.6},
            {rotate: '20deg'}
        ]
    }
})
export default AboutMe;