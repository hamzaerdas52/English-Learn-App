import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const renk = "#6e90bd"

export default class index extends Component {

    constructor(){
        super()
        this.state={
            playing:true
        }
    }

    render() {
        return (
            <View style={style.body}>
                <View style={style.clock_area}>
                    <CountdownCircleTimer
                        style={style.clock}
                        isPlaying={this.state.playing}
                        size={hp("13%")}
                        strokeWidth={7}
                        duration={10}
                        colors={[
                            ["green", 0.5],
                            ["yellow", 0.5],
                            ["red", 0.5]
                        ]}
                        //onComplete={() => alert("Bitti")}
                    >
                        {({remainingTime}) => <Text style={{fontSize:40}}>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                </View>
                <View style={style.question}>
                    <Text style={style.word}>
                        Kelime
                    </Text>
                    <Text style={style.question_text}>
                        bu kelime ne anlama gelmektedir?
                    </Text>
                </View>
                <View style={style.options}>
                    <View style={style.buttons}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Şık 1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttons}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Şık 2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttons}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Şık 3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttons}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.button_text}>Şık 4</Text>
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
    clock_area:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:hp("3%")
    },
    question:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginTop:hp("7%")
    },
    word:{
        marginRight:wp("2%"),
        fontSize:hp("2.4%")
    },
    question_text:{
        fontSize:hp("2.4%")
    },
    options:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:hp("7%")
    },
    buttons:{
        marginBottom:hp("4%")
    },
    button:{
        borderWidth:1,
        width:wp("35%"),
        height:hp("6%"),
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:renk
    },
    button_text:{
        fontSize:hp("2.8&"),
        color:"white"
    }
})
