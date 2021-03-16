import React, { Component } from 'react'
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Home extends Component {
    render() {
        return (
            <View style={style.body}>
                <View style={style.header}>
                    <View style={style.menü_button_area}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.openDrawer()}
                            style={style.menü_button}>
                            <Icon name={'bars'} size={30} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: '700' }} > WORDLİB </Text>
                    </View>
                    <View>
                    </View>
                </View>
                <View>
                    <View>
                        <TouchableOpacity>
                            <Text>Kategoriler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('5%'),
        backgroundColor: '#a7c2d3'
    },
    menü_button_area: {
        left: wp('4%')
    },
    menü_button: {
    }
})
