import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    Animated,
    Easing,
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

import axios from 'axios'
import EyeAnimation from '../../components/animationComponents/eyeAnimation';

import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { LoginManager, AccessToken } from 'react-native-fbsdk'

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
            isTurkish : false
        }
        this.eyeAnimation= new Animated.Value(0)
    }

    componentDidMount() {
        //this.playAnimation()
    }

    // playAnimation = () => {
    //     this.eyeAnimation.setValue(0)
    //     Animated.timing(this.eyeAnimation, {
    //         toValue:1,
    //         duration: 200,
    //         easing: Easing.linear,
    //         useNativeDriver: false,
    //         delay:1500
    //     }).start(() => this.playAnimation())
    // }

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
        console.log(values.email)
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

    fetchUser = () => {
        const url = `http://127.0.0.1:5000/login`
        axios({
            method:'post',
            url:url,
            data:{
                'username':1,
                'password':'Jessa'
            }
        })
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))
    }
    //requests.post("http://127.0.0.1:5000/login",json={"username": 1, "password": "Jessa"})



    render() {
        const { turkce } = this.state

        // const opacity = this.eyeAnimation.interpolate({
        //     inputRange:[0, 0.5, 1],
        //     outputRange:[0, 1, 0]
        // })

        return (
            <SafeAreaView style={style.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={style.header}>
                            <View style={style.flag_view}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('TrLogin')}
                                >
                                    <Image style={style.flag} source={require('../../image/turkey.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={style.logo_area}>
                                
                                <Image style={{width:wp('40%'),height:hp('30%'),resizeMode:'contain'}} source={require('../../image/LOGO.png')} />
                                
                                <EyeAnimation/>
                                {/* <Animated.View
                                    style={{
                                        width:wp('4%'),
                                        height:hp('1.2%'),
                                        backgroundColor:'white',
                                        position:'absolute',
                                        left: 161,
                                        top: 47.5,
                                        opacity
                                        }}
                                /> */}
                            </View>
                            
                            <View style={style.signUp}>
                                <Text style={style.signUpText}>Login</Text>
                            </View>
                        </View>
                        <View style={style.footer}>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                onSubmit={this._renkDegisim}
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
                                                <Text style={{ fontSize: hp('2%') }}>Email</Text>
                                                <TextInput
                                                    value={values.email}
                                                    onChangeText={handleChange('email')}
                                                    style={[style.textInput, { borderColor: this.state.borderColorEmail }]}
                                                />
                                            </View>
                                            <View style={style.insideForm}>
                                                <Text style={{ fontSize: hp('2%') }}>Password</Text>
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
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <TouchableOpacity>
                                                    <Text style={{fontSize:hp('2%'),fontWeight:'700',color:'#263238'}}>Forget Password?</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ marginTop: hp('2.6%') }}>
                                            <View>
                                                <TouchableOpacity
                                                    style={style.signUpBotton}
                                                    onPress={ handleSubmit }
                                                >
                                                    <Text style={{ color: 'white', fontSize: hp('2.3%') }}>Login</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: hp('1%') }}>
                                                <Text style={{ fontSize: hp('2.4%') }}>or</Text>
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
                                    <Text style={{ fontSize: hp('2.4%') }}>Don't have an account? </Text>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('EnRegister')}
                                    >
                                        <Text style={style.logInButton}>Sign Up</Text>
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
