import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image
} from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome5'

export default class index extends Component {
    render() {
        return (
            <View>
                <View style={style.back_icon}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name={'arrow-left'} size={30} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}> Menü </Text>
                </View>
                <View style={style.user_area}>
                    <View style={style.user_avatar}>
                        <Image source={require('../../image/user.png')} />
                    </View>
                    <View style={style.username}>
                        <Text>Username</Text>
                    </View>
                </View>
                <View style={style.menü_buttons}>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Arkadaşlarım</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Skorlarım</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Ayarlar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Hakkımızda</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Çıkış</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const style = StyleSheet.create({
    back_icon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        left: wp('2%'),
        top: hp('2%')
    },
    user_avatar: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: hp('4%')
    },
    username: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: hp('5%')
    },
    menü_buttons: {
        top: hp('8%'),
        paddingHorizontal: 20
    },
    button_area: {
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#b5c6e2',
        padding: hp('3%'),
        borderRadius: 15,
        shadowColor: "#42053a",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    button_text:{
        fontSize:17,
        color:'#0d257b'
    }
})
