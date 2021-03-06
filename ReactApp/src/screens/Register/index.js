import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';

export default class Register extends Component {
    render() {
        return (
            <SafeAreaView style={[style.body,{}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[style.signUp, {}]}>
                            <Text style={style.signUpText}>Sign Up</Text>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={{fontSize:hp('2.5%')}}>Already have an account? </Text>
                                <TouchableOpacity>
                                    <Text style={style.logInButton}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.form]}>
                            <View style={style.insideForm}>
                                <Text style={{fontSize:hp('2%')}}>Full Name</Text>
                                <TextInput
                                    style={style.textInput}
                                />
                            </View>
                            <View style={style.insideForm}>
                                <Text style={{fontSize:hp('2%')}}>Email<Text style={{ color: '#FF7A59', fontSize:hp('2%') }}> *</Text></Text>
                                <TextInput
                                    style={style.textInput}
                                />
                            </View>
                            <View style={style.insideForm}>
                                <Text style={{fontSize:hp('2%')}}>Password<Text style={{ color: '#FF7A59', fontSize:hp('2%') }}> *</Text></Text>
                                <TextInput
                                    style={style.textInput}
                                />
                                <TouchableOpacity style={style.Icon}>
                                    <Icon name={'eye'} size={20} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ color: '#5E656F', fontSize:hp('2%') }}>Use 8 or more characters with a mix of letters, numbers, and symbols.</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp('3%')}}>
                            <View style={style.checkView}>
                                <TouchableOpacity style={style.checkBox}
                                />
                                <Text style={{fontSize:hp('2.3%')}}>  I agree to the </Text>
                                <TouchableOpacity><Text style={style.policyText}>Terms</Text></TouchableOpacity>
                                <Text style={{fontSize:hp('2.3%')}}> and </Text>
                                <TouchableOpacity><Text style={style.policyText}>Privacy Policy.</Text></TouchableOpacity>
                            </View>
                            <View style={[style.checkView, {marginTop:'3%'}]}>
                                <TouchableOpacity style={style.checkBox}
                                />
                                <Text style={{fontSize:hp('2.3%')}}>  Subscribe for select product updates.</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: hp('2.6%')}}>
                            <View>
                                <TouchableOpacity
                                    style={style.signUpBotton}
                                >
                                    <Text style={{ color: 'white', fontSize:hp('2.3%') }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{ fontSize: hp('2.4%') }}>or</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[style.signUpBotton, {}]}
                                >
                                    <Text style={{ color: 'white', fontSize:hp('2.3%') }}>Sign Up with Google</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop: hp('0.1%')}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: hp('2.4%') }}>Already have an account? </Text>
                                <TouchableOpacity>
                                    <Text style={style.logInButton}>Log In</Text>
                                </TouchableOpacity>
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
        paddingHorizontal: wp('5%')
    },
    signUp: {
        flexDirection: 'row',
        marginTop: hp('5%'),
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    signUpText: {
        fontSize: wp('5%'),
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
        borderColor: '#212121',
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
        fontSize:hp('2.3%')
    },
    signUpBotton: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: hp('2.2%')
    }
})
