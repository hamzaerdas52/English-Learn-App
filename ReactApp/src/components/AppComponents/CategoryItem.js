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

export default class CategoryItem extends Component {
    render() {
        const { item } = this.props
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={style.item_name_btn}
                >
                    <Icon name={"briefcase-medical"} size={30} style={{marginBottom:hp("1.5%")}}/>
                    <Text style={style.item_name_text}> {item.name} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item_name_btn: {
        backgroundColor: '#265fca',
        width: wp("27%"),
        height: hp("15%"),
        marginBottom: '15%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(112,112,112,0.4)',
        paddingHorizontal: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    item_name_text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    }
})
