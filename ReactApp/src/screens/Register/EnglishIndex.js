import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import { Root, Popup } from 'popup-ui'

import auth from '@react-native-firebase/auth';
import EyeAnimation from '../../components/animationComponents/eyeAnimation';
import UrlIndex from '../../methods/url'

import axios from 'axios'
import { _allowStateReadsStart } from 'mobx';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '447608861005-prrtt2v1n7el7oth3mg58gkphnsjj0ae.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '',
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '',
});

export default class Register extends Component {

    constructor() {
        super()
        this.state = {
            hidePassword: true,
            hidePassword2: true,
            borderColorName: '',
            borderColorEmail: '',
            borderColorPassword: '',
            borderColorPassword2: '',
            borderColorRed: 'red',
            borderColorBlack: 'black',
            loaded: false,
            nextPage: false
        }
    }

    popUp = (type, title, text) => {
        Popup.show({
            type: type,
            title: title,
            button: true,
            textBody: text,
            buttonText: "Close",
            autoClose: false,
            timing: 2000,
            callback: () => {
                Popup.hide(),
                    (type == "Success") ? this.props.navigation.navigate('EnLogin') : null
            }
        })
    }

    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        this.setState({ loaded: true })

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);

        (this.state.loaded) ? this.props.navigation.navigate('Home') : console.log('Giriş başarısız')

    }

    _handleSubmit = (values) => {
        console.log(values.fullName)
        console.log(values.email)
        console.log(values.password)
    }

    _renkDegisim = (values) => {
        if (values.fullName == '') {
            this.setState({ borderColorName: this.state.borderColorRed })
        }
        else {
            this.setState({ borderColorName: this.state.borderColorBlack })
        }
        if (values.email == '') {
            this.setState({ borderColorEmail: this.state.borderColorRed })
        }
        else {
            this.setState({ borderColorEmail: this.state.borderColorBlack })
        }
        if (values.password == '') {
            this.setState({ borderColorPassword: this.state.borderColorRed })
        }
        else {
            this.setState({ borderColorPassword: this.state.borderColorBlack })
        }
        if (values.password2 == '') {
            this.setState({ borderColorPassword2: this.state.borderColorRed })
        }
        else {
            this.setState({ borderColorPassword2: this.state.borderColorBlack })
        }

    }

    isEquels = (values) => {
        if (values.password == values.password2) {
            if (values.fullName == '' || values.email == '' || values.password == '') {
                //alert('Please Fill All')
                this.popUp("Warning", "Warning", "Please Fill All")
            }
            else {
                this.registerUser(values)
            }
        }
        else {
            this.popUp("Danger", "Danger", "Passwords are not the same")
        }
    }

    registerUser = (values) => {
        const url = UrlIndex + 'register'
        axios({
            method: 'post',
            url: url,
            data: {
                'username': values.fullName,
                'email': values.email,
                'password': values.password
            }
        })
            .then((res) => {
                console.log(res)
                this.popUp("Success", "Success", "Please confirm the mail to your email address.")
            })
            .catch((error) => console.log('Hata ' + error.response.data))
    }

    render() {
        return (
            <Root>
                <SafeAreaView style={[style.body, {}]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <View style={style.header}>

                                <View style={style.logo_area}>
                                    <Image style={{ width: wp('40%'), height: hp('30%'), resizeMode: 'contain' }} source={require('../../image/LOGO.png')} />
                                    <EyeAnimation />
                                </View>
                                <View style={style.signUp}>
                                    <Text style={style.signUpText}>Sign Up</Text>
                                </View>
                            </View>
                            <View style={style.footer}>
                                <Formik
                                    initialValues={{
                                        fullName: '',
                                        email: '',
                                        password: '',
                                        password2: ''
                                    }}
                                    onSubmit={(values) => {
                                        this._renkDegisim(values), this.isEquels(values),
                                            (this.state.nextPage) ?
                                                this.props.navigation.navigate('Home') : null
                                    }}

                                    validationSchema={Yup.object().shape({
                                        //fullName: Yup.string().required('Name is required'),
                                        // email: Yup.string().email().required('Email is required'),
                                        // password: Yup.string().required('Password is required')
                                    })}
                                >
                                    {({
                                        values,
                                        handleSubmit,
                                        handleChange,
                                        errors
                                    }) => (
                                        <View>
                                            <View style={[style.form]}>
                                                <View style={style.insideForm}>
                                                    <TextInput
                                                        value={values.fullName}
                                                        placeholder={'Username'}
                                                        placeholderTextColor={'#07174a'}
                                                        onChangeText={handleChange('fullName')}
                                                        style={[style.textInput, { borderColor: this.state.borderColorName }]}
                                                    />
                                                </View>
                                                <View style={style.insideForm}>
                                                    <TextInput
                                                        value={values.email}
                                                        placeholder={'Email'}
                                                        placeholderTextColor={'#07174a'}
                                                        onChangeText={handleChange('email')}
                                                        style={[style.textInput, { borderColor: this.state.borderColorEmail }]}
                                                    />
                                                </View>
                                                <View style={style.insideForm}>
                                                    <TextInput
                                                        value={values.password}
                                                        placeholder={'Password'}
                                                        placeholderTextColor={'#07174a'}
                                                        onChangeText={handleChange('password')}
                                                        style={[style.textInput, { borderColor: this.state.borderColorPassword }]}
                                                        secureTextEntry={this.state.hidePassword}
                                                    />
                                                    <TouchableOpacity
                                                        style={style.Icon}
                                                        onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}
                                                    >
                                                        <Icon name={(this.state.hidePassword) ? 'eye-slash' : 'eye'} size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={style.insideForm}>
                                                    <TextInput
                                                        value={values.password2}
                                                        placeholder={'Confirm Password'}
                                                        placeholderTextColor={'#07174a'}
                                                        onChangeText={handleChange('password2')}
                                                        style={[style.textInput, { borderColor: this.state.borderColorPassword2 }]}
                                                        secureTextEntry={this.state.hidePassword2}
                                                    />
                                                    <TouchableOpacity
                                                        style={style.Icon}
                                                        onPress={() => this.setState({ hidePassword2: !this.state.hidePassword2 })}
                                                    >
                                                        <Icon name={(this.state.hidePassword2) ? 'eye-slash' : 'eye'} size={20} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={{ marginTop: hp('2.6%') }}>
                                                <View>
                                                    <TouchableOpacity
                                                        style={style.signUpBotton}
                                                        onPress={handleSubmit}
                                                    >
                                                        <Text style={{ color: 'white', fontSize: hp('2.3%') }}>Sign Up</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: hp('1%') }}>
                                                    <Text style={{ fontSize: hp('2.4%') }}>or</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                    <View>
                                                        <TouchableOpacity onPress={() => this.onGoogleButtonPress().then(() => alert('Google ile giriş yapıldı'))}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Image style={{ width: wp('7%'), height: hp('4%') }} source={require('../../icons/icons8-google-240.png')} />
                                                                <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('0.5%') }}> Google </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Icon name={"facebook-f"} size={hp('3.5%')} color={"#3b5999"} />
                                                                <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('0.5%') }}> Facebook </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                    }
                                </Formik>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('1%'), padding: 25 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: hp('2.4%') }}>Already have an account? </Text>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('EnLogin')}
                                        >
                                            <Text style={style.logInButton}>Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Root>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#00B7EB'
    },
    signUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    signUpText: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        color: 'black'
    },
    logInButton: {
        fontWeight: '700',
        color: '#0071DF',
        textDecorationLine: 'underline',
        fontSize: hp('2.5%')
    },
    form: {
        marginTop: hp('3%')
    },
    insideForm: {
        marginBottom: hp('2.8%')
    },
    textInput: {
        marginTop: hp('1%'),
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15
    },
    Icon: {
        position: 'absolute',
        right: '5%',
        top: '45%'
    },
    signUpBotton: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#65b5fc',
        padding: hp('2.2%')
    },
    flag: {
        resizeMode: 'contain',
        width: wp('7%'),
        height: hp('7%')
    },
    flag_view: {
        position: 'absolute',
        flexDirection: 'row',
        right: wp('3%')
    },
    logo_area: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        marginTop: hp('4%'),
        paddingHorizontal: wp('10%'),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white'
    }
})
