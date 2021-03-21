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

import EyeAnimation from '../../components/animationComponents/eyeAnimation';

import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import UrlIndex from '../../methods/url'

import { LoginManager, AccessToken } from 'react-native-fbsdk'

import axios from 'axios'

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '447608861005-prrtt2v1n7el7oth3mg58gkphnsjj0ae.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '',
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '',
});

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            hidePassword: true,
            borderColorEmail: '',
            borderColorPassword: '',
            borderColorRed: 'red',
            borderColorBlack: 'black',
            turkce: false,
            loaded: false,
            isTurkish : false,
            isClose : true
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

    onFacebookButtonPress = async () => {
        //Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        //Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        //Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        //Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
        console.log('Facebook ile girildi')
      }

    _handleSubmit = (values) => {
        console.log(values.fullName)
        console.log(values.email)
        console.log(values.password)
    }

    _renkDegisim = (values) => {
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

    isEquels = (values) => {
        if (values.email == '' || values.password == '') {
            alert('Hepsini doldur')
        }
        else {
            this.fetchUser(values)
        }
    }

    fetchUser = (values) => {
        const url = UrlIndex + 'login'
        axios({
            method:'post',
            url:url,
            data:{
                'email': values.email,
                'password' : values.password
            }
        })
        .then((res)=>{
            console.log(res.data['Token']),
            alert('Giriş Başarılı'),
            setTimeout(() => {
                this.props.navigation.navigate('Home')
            },2000) 
            })
        .catch((error)=>alert(error.response.data['Error Message']))
    }

    render() {
        const { turkce } = this.state
        return (
            <SafeAreaView style={style.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={style.header}>
                            <View style={style.flag_view}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('EnLogin')}
                                >
                                    <Image style={style.flag} source={require('../../image/united-kingdom.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={style.logo_area}>
                                <Image style={{width:wp('40%'),height:hp('30%'),resizeMode:'contain'}} source={require('../../image/LOGO.png')} />
                                <EyeAnimation/>
                            </View>
                            {this.state.isClose ? 
                            <View
                                style={{position:'absolute', width:wp('3.5%'), height:hp('1%'),backgroundColor:'rgba(255,255,255,0)', top:70, left:177, borderRadius:20}}
                            /> :
                            <View
                                style={{position:'absolute', width:wp('3.5%'), height:hp('1%'),backgroundColor:'rgba(255,255,255,1)', top:70, left:177, borderRadius:20}}
                            />
                            }
                            <View style={style.signUp}>
                                <Text style={style.signUpText}>Giriş Yap</Text>
                            </View>
                        </View>
                        <View style={style.footer}>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                onSubmit={(values) => {
                                    this._renkDegisim(values), 
                                    this.isEquels(values)
                                }}
                                validationSchema={Yup.object().shape({
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
                                                    value={values.email}
                                                    placeholder={'E-posta'}
                                                    placeholderTextColor={'#07174a'}
                                                    onChangeText={handleChange('email')}
                                                    style={[style.textInput, { borderColor: this.state.borderColorEmail }]}
                                                />
                                            </View>
                                            <View style={style.insideForm}>
                                                <TextInput
                                                    value={values.password}
                                                    placeholder={'Şifre'}
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
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <TouchableOpacity>
                                                    <Text style={{fontSize:hp('2%'),fontWeight:'700',color:'#263238'}}>Şifremi Unuttum</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: hp('2.6%') }}>
                                            <View>
                                                <TouchableOpacity
                                                    style={style.signUpBotton}
                                                    onPress={ handleSubmit }
                                                >
                                                    <Text style={{ color: 'white', fontSize: hp('2.3%') }}>Giriş Yap</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: hp('3%') }}>
                                                <Text style={{ fontSize: hp('2.4%') }}>ya da</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => this.onGoogleButtonPress()}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Image style={{ width: wp('7%'), height: hp('4%') }} source={require('../../icons/icons8-google-240.png')} />
                                                            <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('0.5%') }}> Google </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={()=>this.onFacebookButtonPress()}
                                                    
                                                    >
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
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('1%'), padding:25 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: hp('2.4%') }}>Hesabınız yok mu? </Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('TrRegister')}
                                    >
                                        <Text style={style.logInButton}>Kayıt Ol</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor:'#00B7EB'
        //#00B7EB
    },
    signUp: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    logo_area:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
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
        marginTop: hp('5%')
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
    },
    footer:{
        marginTop:hp('4%'),
        paddingHorizontal:wp('10%'),
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor:'white'
    },
    header:{
    },
    flag:{
        resizeMode:'contain',
        width:wp('7%'),
        height:hp('7%')
    },
    flag_view:{
        position:'absolute',
        flexDirection:'row',
        right:wp('3%')
    }
})
