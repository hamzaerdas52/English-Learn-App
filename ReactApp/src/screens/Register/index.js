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

import auth from '@react-native-firebase/auth';

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
            borderColorName: '',
            borderColorEmail: '',
            borderColorPassword: '',
            borderColorRed: 'red',
            borderColorBlack: 'black',
            girildiMi: 'true',
            turkce: false,
            loaded: false,

        }
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

    }

    render() {
        const { turkce } = this.state
        return (
            <SafeAreaView style={[style.body, {}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={style.signUp}>
                            {(turkce) ? <Text style={style.signUpText}>Kayıt Ol</Text> :
                                <Text style={style.signUpText}>Sign Up</Text>
                            }
                        </View>
                        <Formik
                            initialValues={{
                                fullName: '',
                                email: '',
                                password: ''
                            }}
                            onSubmit={this._renkDegisim}
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
                                            <Text style={{ fontSize: hp('2%') }}>Full Name</Text>
                                            <TextInput
                                                value={values.fullName}
                                                onChangeText={handleChange('fullName')}
                                                style={[style.textInput, { borderColor: this.state.borderColorName }]}
                                            />
                                        </View>
                                        <View style={style.insideForm}>
                                            <Text style={{ fontSize: hp('2%') }}>Email<Text style={{ color: '#FF7A59', fontSize: hp('2%') }}> *</Text></Text>
                                            <TextInput
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                style={[style.textInput, { borderColor: this.state.borderColorEmail }]}
                                            />
                                        </View>
                                        <View style={style.insideForm}>
                                            <Text style={{ fontSize: hp('2%') }}>Password<Text style={{ color: '#FF7A59', fontSize: hp('2%') }}> *</Text></Text>
                                            <TextInput
                                                value={values.password}
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
                                        <View>
                                            <Text style={{ color: '#5E656F', fontSize: hp('2%') }}>Use 8 or more characters with a mix of letters, numbers, and symbols.</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: hp('3%') }}>
                                        <View style={style.checkView}>
                                            <TouchableOpacity style={style.checkBox}
                                            />
                                            <Text style={{ fontSize: hp('2.3%') }}>  I agree to the </Text>
                                            <TouchableOpacity><Text style={style.policyText}>Terms</Text></TouchableOpacity>
                                            <Text style={{ fontSize: hp('2.3%') }}> and </Text>
                                            <TouchableOpacity><Text style={style.policyText}>Privacy Policy.</Text></TouchableOpacity>
                                        </View>
                                        <View style={[style.checkView, { marginTop: '3%' }]}>
                                            <TouchableOpacity style={style.checkBox}
                                            />
                                            <Text style={{ fontSize: hp('2.3%') }}>  Subscribe for select product updates.</Text>
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
                                                <TouchableOpacity onPress={() => this.onGoogleButtonPress().then(()=>alert('Google ile giriş yapıldı'))}>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('4%') }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: hp('2.4%') }}>Already have an account? </Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Login')}
                                >
                                    <Text style={style.logInButton}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ turkce: !this.state.turkce })}>
                            <Text>Türkçe</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: wp('5%')
    },
    signUp: {
        flexDirection: 'row',
        marginTop: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    signUpText: {
        fontSize: hp('3%'),
        fontWeight: 'bold'
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
        top: '52%'
    },
    checkBox: {
        borderWidth: 1,
        height: hp('3%'),
        width: wp('5%'),

    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    policyText: {
        color: '#9CA5B4',
        textDecorationLine: 'underline',
        fontSize: hp('2.3%')
    },
    signUpBotton: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: hp('2.2%')
    }
})
