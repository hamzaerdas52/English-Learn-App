import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class index extends Component {
    render() {
        return (
            <View style={style.body}>
                <View style={style.difficulty}>
                    <Text style={style.difficulty_text}>
                        Zorluk seviyesi seçiniz
                    </Text>
                </View>
                <View style={{position:"absolute"}}>
                    <Text>Gizli</Text>
                </View>
                <View style={style.buttons_area}>
                    <View style={style.button_area}>
                        <TouchableOpacity style={style.button}>
                            <Text>Kolay</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Orta</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Zor</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:"white"
    },
    difficulty:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:hp("20%")
    },
    buttons_area:{
        justifyContent:"center",
        alignItems:"center",

    }
})
