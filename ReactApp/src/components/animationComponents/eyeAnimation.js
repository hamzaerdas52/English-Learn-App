import React, { Component } from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class eyeAnimation extends Component {
    constructor(){
        super();
        this.eyeAnimation= new Animated.Value(0)
    }
    componentDidMount() {
        this.playAnimation()
    }

    playAnimation = () => {
        this.eyeAnimation.setValue(0)
        Animated.timing(this.eyeAnimation, {
            toValue:1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
            delay:1500
        }).start(() => this.playAnimation())
    }
    render() {
        const opacity = this.eyeAnimation.interpolate({
            inputRange:[0, 0.5, 1],
            outputRange:[0, 1, 0]
        })
        return (
            <View>
                <Animated.View
                                    style={{
                                        width:wp('4%'),
                                        height:hp('1.2%'),
                                        backgroundColor:'white',
                                        position:'absolute',
                                        right: wp('21.5'),
                                        top: hp('-6'),
                                        opacity
                                        }}
                                />
            </View>
        )
    }
}
