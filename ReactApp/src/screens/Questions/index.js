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
            question_number: 10,
            words: [],
            word: '',
            word_number: -1,
            answer_true: '',
            answers_wrong: [],
            a_state: "",
            b_state: "",
            c_state: "",
            d_state: "",
            sayi: 0,
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
        const url = UrlIndex + 'word/turkish/random/' + this.state.id + '/' + this.state.question_number
        const url1 = UrlIndex + 'word/turkish/random/' + this.state.id + '/' + 30
        const token = this.state.token
        axios({
            method: 'GET',
            url: url,
            headers: { token }
        })
            .then((res) => {
                var words = []
                var true_word;
                res.data.forEach((item) => {
                    item.english_words.forEach((a) => { true_word = a.word })
                    words.push({
                        word: item.word,
                        id: item.id,
                        true: true_word
                    })
                })
                this.setState({ words })
                this.updateWord()
                this.randomNumber
            })
            .catch((e) => {
                console.log(e)
            })

        axios({
            method: 'GET',
            url: url1,
            headers: { token }
        })
            .then((res) => {
                var wrong_word = [];
                res.data.forEach((item) => {
                    item.english_words.forEach((a) => {
                        wrong_word.push({
                            wrong: a.word
                        })
                    })
                })
                this.setState({ answers_wrong: wrong_word})
                this.updateChoice()
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
            this.popUp("Warning", "Tamamlandı", "", "false")
            this.setState({ playing: false })
        }
        else {
            await this.setState({ word_number: this.state.word_number + 1 })
            await this.setState({
                word: this.state.words[this.state.word_number].word,
                answer_true: this.state.words[this.state.word_number].true
            })
        }
    }

    updateChoice = async () => {
        var sayi = await this.state.sayi
        if (sayi == 1) {
            await this.setState({
                a_state: await this.state.answer_true,
                b_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                c_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                d_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong
            })
        }
        if (sayi == 2) {
            await this.setState({
                a_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                b_state: await this.state.answer_true,
                c_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                d_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong
            })
        }
        if (sayi == 3) {
            await this.setState({
                a_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                b_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                c_state: await this.state.answer_true,
                d_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong
            })
        }
        else {
            await this.setState({
                a_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                b_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                c_state: await this.state.answers_wrong[Math.floor(Math.random() * 29) + 1].wrong,
                d_state: await this.state.answer_true
            })
        }
    }

    returnWord = async () => {
        await this.setState({ word_number: this.state.word_number - 1 })
        console.log(this.state.word_number)
        await this.setState({
            word: this.state.words[this.state.word_number].word,
            answer_true: this.state.words[this.state.word_number].true
        })
        console.log(this.state.word)

    }

    randomNumber = () => {
        var sayi = Math.floor(Math.random() * 4) + 1
        this.setState({ sayi: sayi })
    }

    randomNumberArray = (boyut, deger) => {

    }

    render() {
        const { title, word, a_state, b_state, c_state, d_state, loading } = this.state
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
                        //Kaydırarak kapatma
                        swipeToClose={false}

                        //Açılıp kapanma
                        onClosed={() => this.setState({ playing: true })}
                        // onOpened={() => alert('Açıldı')}
                        style={style.modal}

                        //Pozisyon
                        position={'center'}

                        //Kutucuğun nerden geleceği
                        entry={'top'}

                        //Aktifleştirme
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
                            duration={30}
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
                            <TouchableOpacity style={style.button}>
                                <Text style={style.button_text}>{a_state}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.button_text}>{b_state}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.button_text}>{c_state}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.buttons}>
                            <TouchableOpacity style={style.button}>
                                <Text style={style.button_text}>{d_state}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.arrow_area}>
                        {(this.state.word_number > 0) ?
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.Decrease(),
                                        this.returnWord()
                                }}>
                                    <Icon name="arrow-circle-left" size={arrow_size} color={arrow_color} />
                                </TouchableOpacity>
                            </View>
                            :
                            <View></View>
                        }
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.Increase(),
                                    this.updateWord(),
                                    this.randomNumber(),
                                    this.updateChoice()
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
        width: wp("35%"),
        height: hp("6%"),
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
