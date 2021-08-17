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
import { Root, Popup } from 'popup-ui'
import ModalBox from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as Progress from 'react-native-progress'
import axios from 'axios';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
} from "react-native-indicators"

import UrlIndex from '../../methods/url';
import AsyncStorage from '@react-native-async-storage/async-storage';


const renk = "#6e90bd"
const arrow_size = hp("8%")
const arrow_color = "#283d6c"

export default class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            loading: true,
            title: this.props.navigation.getParam("name"),
            id: this.props.navigation.getParam("id"),
            progress: 0.1,
            token: '',
            question_number: 20,
            words: [],
            word: '',
            word_number: -1,
            answers: [],
            trues: 0,
            falses: 0,
            nulls: 0,
            a_: "",
            b_: "",
            c_: "",
            d_: ""
        }
    }

    popUp = (type, title, text, play) => {
        Popup.show({
            type: type,
            title: title,
            button: true,
            textBody: text,
            buttonText: "Close",
            autoClose: false,
            timing: 2000,
            callback: () => {
                Popup.hide()
                this.refs.modal_finish.open()
                if (play == true) {
                    this.setState({ playing: true })
                }
            }
        })
    }

    componentDidMount = async () => {
        this.refs.modal.open()
        await AsyncStorage.getItem('User_Token').then((res) => {
            this.setState({ token: res })
        })

        /* /exam/english/category/id */

        const url = UrlIndex + 'exam/english/category/' + this.state.id
        const token = this.state.token
        axios({
            method: 'GET',
            url: url,
            headers: { token }
        })
            .then((res) => {
                console.log(res)
                var words = res.data
                this.setState({ words })
                this.updateWord()
            })
            .catch((e) => {
                console.log(e)
            })
    }

    Increase = async () => {
        if (this.state.progress < 0.9) {
            await this.setState({ progress: this.state.progress + 0.1 })
        }
    }

    Decrease = async () => {
        await this.setState({ progress: this.state.progress - 0.1 })
    }

    updateWord = async () => {
        if (this.state.word_number == this.state.question_number - 1) {
            var dogru = 0, yanlis = 0, nulls = 0;
            for (i = 0; i <= this.state.answers.length - 1; i++) {
                if (this.state.answers[i] == true) {
                   this.state.trues += 1
                }
                else if (this.state.answers[i] == false) {
                    this.state.falses += 1
                }
                else if (this.state.answers[i] == null) {
                    this.state.nulls += 1
                }
            }
            this.popUp("Warning", "Tamamlandı", " ","false")
            this.setState({ playing: false })
        }
        else {
            await this.setState({ word_number: this.state.word_number + 1 })
            await this.setState({
                word: this.state.words[this.state.word_number].word,
                choices: this.state.words[this.state.word_number].options
            })
            await this.setState({
                a_: this.state.choices[0].word,
                b_: this.state.choices[1].word,
                c_: this.state.choices[2].word,
                d_: this.state.choices[3].word,
            })
        }
    }

    ChoiceCheck = async (choice) => {
        await this.state.answers.push(this.state.choices[choice].is_correct)
        console.log(this.state.answers)
    }

    nullDeger = async () => {
        await this.state.answers.push(null)
    }

    returnWord = async () => {
        await this.setState({ word_number: this.state.word_number - 1 })
        await this.setState({
            word: this.state.words[this.state.word_number].word,
            answer_true: this.state.words[this.state.word_number].true
        })
    }

    render() {
        const { title, word, a_, b_, c_, d_ } = this.state
        return (
            <Root>
                <View style={style.body}>
                    <View style={style.header}>
                        <View style={style.category_name}>
                            <Text style={style.category_name_text}>
                                {title}
                            </Text>
                        </View>

                    </View>
                    <View style={style.goBack_btn}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name={'arrow-left'} size={30} />
                        </TouchableOpacity>
                    </View>
                    < ModalBox
                        swipeToClose={false}
                        onClosed={() => this.setState({ playing: true })}
                        style={style.modal}
                        position={'center'}
                        entry={'top'}
                        isDisabled={false}
                        backdrop={true}
                        ref={'modal'}
                    >
                        <View style={style.modal_text}>
                            <Text style={style.modal_text_1}>Hazır mısın?</Text>
                            <TouchableOpacity
                                style={style.modal_btn}
                                onPress={() => {
                                    this.refs.modal.close()
                                }}>
                                <Text style={style.modal_btn_text}>Başla</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalBox>
                    <View style={style.clock_area}>
                        <CountdownCircleTimer
                            style={style.clock}
                            isPlaying={this.state.playing}
                            size={hp("13%")}
                            strokeWidth={7}
                            duration={60}
                            colors={[
                                ["green", 0.5],
                                ["yellow", 0.5],
                                ["red", 0.5]
                            ]}
                            onComplete={() => this.popUp("Warning", "Süre Bitti", "", true)}
                        >
                            {({ remainingTime }) => <Text style={{ fontSize: 40 }}>{remainingTime}</Text>}
                        </CountdownCircleTimer>
                    </View>
                    <View style={style.question_number}>
                        <Text style={style.question_number_text}>Soru {(this.state.word_number < 1) ? "1" : this.state.word_number + 1}:</Text>
                    </View>
                    <View style={style.question}>
                        <Text style={style.word}>
                            {word}
                        </Text>
                        <Text style={style.question_text}>
                            Doğru çevirisi nedir?
                        </Text>
                    </View>
                    <View style={style.options}>
                        <View style={style.buttons}>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => {
                                    this.ChoiceCheck('0'),
                                        this.Increase(),
                                        this.updateWord()
                                }}
                            >
                                <Text style={style.button_text}>{a_}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => {
                                    this.ChoiceCheck('1'),
                                        this.Increase(),
                                        this.updateWord()
                                }}
                            >
                                <Text style={style.button_text}>{b_}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => {
                                    this.ChoiceCheck('2'),
                                        this.Increase(),
                                        this.updateWord()
                                }}
                            >
                                <Text style={style.button_text}>{c_}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => {
                                    this.ChoiceCheck('3'),
                                        this.Increase(),
                                        this.updateWord()
                                }}
                            >
                                <Text style={style.button_text}>{d_}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.arrow_area}>
                        <View></View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.Increase(),
                                    this.updateWord(),
                                    this.nullDeger()
                            }}>
                                <Icon name="arrow-circle-right" size={arrow_size} color={arrow_color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.progress}>
                        <Progress.Bar
                            animated={false}
                            progress={this.state.progress}
                            width={wp("100%")}
                            color={"#0a3576"}
                            unfilledColor={"#bbb"}
                            borderWidth={1}
                            borderColor={"#a1a1a1"}
                            height={hp("5%")}
                        />

                    </View>
                    < ModalBox
                        swipeToClose={false}
                        style={style.modal}
                        position={'center'}
                        entry={'right'}
                        isDisabled={false}
                        backdrop={true}
                        ref={'modal_finish'}
                    >
                        <View style={style.modal_text}>
                            <Text style={style.modal_text_1}>Doğru sayınız: {this.state.trues}</Text>
                            <Text style={style.modal_text_1}>Yanlış sayınız: {this.state.falses}</Text>
                            <Text style={style.modal_text_1}>Boş sayınız: {this.state.nulls}</Text>
                            <TouchableOpacity
                                style={style.modal_btn}
                                onPress={() => {
                                    this.props.navigation.navigate("Home")
                                }}>
                                <Text style={style.modal_btn_text}>Kapat</Text>
                            </TouchableOpacity>
                        </View>
                    </ModalBox>
                </View>
            </Root >

        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        flexDirection: "row",
        width: wp("100%"),
        height: hp("6%"),
        alignItems: "center",
        justifyContent: "center"
    },
    goBack_btn:
    {
        position: "absolute",
        marginLeft: wp("3%"),
        marginTop: hp("1%")
    },
    question_number:
    {
        position: "absolute",
        marginTop: hp("23%"),
        marginLeft: wp("5%")
    },
    question_number_text: {
        fontSize: hp("3%"),
        fontWeight: 'bold'
    },
    category_name_text:
    {
        fontSize: hp("3%"),
        fontWeight: "bold"
    },
    clock_area: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("3%")
    },
    question: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: hp("4%")
    },
    word: {
        fontSize: hp("2.6%"),
        paddingVertical: hp("0.6%"),
        paddingHorizontal: wp("15%")
    },
    question_text: {
        fontSize: hp("2.4%"),
    },
    options: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("5%")
    },
    buttons: {
        marginBottom: hp("4%")
    },
    button: {
        borderWidth: 1,
        width: wp("45%"),
        height: hp("8%"),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: renk
    },
    button_text: {
        fontSize: hp("2.8&"),
        color: "white"
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('20%'),
        backgroundColor: '#358edf',
        width: wp('50%'),
        borderRadius: 30
    },
    modal_text: {
        justifyContent: "center",
        alignItems: "center"
    },
    modal_text_1: {
        fontSize: hp("2.5%"),
        color: "white"
    },
    modal_btn: {
        justifyContent: "center",
        alignItems: "center",
        width: wp("18%"),
        height: hp("5"),
        backgroundColor: "white",
        marginTop: hp("2%"),
        borderRadius: 5
    },
    modal_btn_text: {
        fontSize: hp("2.3%"),
    },
    arrow_area: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("13%"),
        marginTop: wp("4%")
    },
    progress: {
        marginTop: hp("2.5%")
    }
})
