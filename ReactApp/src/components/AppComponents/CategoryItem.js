import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import NavigationService from '../NavigationService'

export default class CategoryItem extends Component {

    render() {
        const { item } = this.props
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress = {() => NavigationService.navigate("Questions", {
                        name:item.name,
                        id: item.id
                    })}
                    style={style.item_name_btn}
                >
                    {/* <Icon name={paw} size={hp("5%")} style={{marginBottom:hp("1.5%"),flex:1}}/> */}
                    <Text style={style.item_name_text}> {item.name} </Text>
                    {/* <Text style={style.item_name_text}> {item.title} </Text> */}
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item_name_btn: {
        flex:2,
        backgroundColor: '#265fca',
        width: wp("28%"),
        height: hp("18%"),
        marginBottom: wp("6%"),
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(112,112,112,0.4)',
        paddingHorizontal: wp("2%"),
        paddingVertical:hp("2%"),
        justifyContent:'center',
        alignItems:'center'
    },
    item_name_text: {
        flex:1,
        color: 'white',
        fontSize: hp("2.3%"),
        fontWeight: '700',
        textAlign:"center"
    }
})
