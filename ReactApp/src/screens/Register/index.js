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
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Register extends Component {
    render() {
        return (
            <SafeAreaView style={[style.body,{backgroundColor:'yellow'}]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={[style.signUp, {backgroundColor:'red'}]}>
                            <Text style={style.signUpText}>Sign Up</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Already have an account? </Text>
                                <TouchableOpacity>
                                    <Text style={style.logInButton}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[style.form, {backgroundColor:'red'}]}>
                            <View style={style.insideForm}>
                                <Text>Full Name</Text>
                                <TextInput
                                    style={style.textInput}
                                />
                            </View>
                            <View style={style.insideForm}>
                                <Text>Email<Text style={{ color: '#FF7A59' }}> *</Text></Text>
                                <TextInput
                                    style={style.textInput}
                                />
                            </View>
                            <View style={style.insideForm}>
                                <Text>Password<Text style={{ color: '#FF7A59' }}> *</Text></Text>
                                <TextInput
                                    style={style.textInput}
                                />
                                <TouchableOpacity style={style.Icon}>
                                    <Icon name={'eye'} size={20} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ color: '#5E656F' }}>Use 8 or more characters with a mix of letters, numbers, and symbols.</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: '5%' , backgroundColor:'red'}}>
                            <View style={style.checkView}>
                                <TouchableOpacity style={style.checkBox}
                                />
                                <Text>  I agree to the </Text>
                                <TouchableOpacity><Text style={style.policyText}>Terms</Text></TouchableOpacity>
                                <Text> and </Text>
                                <TouchableOpacity><Text style={style.policyText}>Privacy Policy.</Text></TouchableOpacity>
                            </View>
                            <View style={[style.checkView, {marginTop:'3%'}]}>
                                <TouchableOpacity style={style.checkBox}
                                />
                                <Text>  Subscribe for select product updates.</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: '5%', backgroundColor:'red'}}>
                            <View>
                                <TouchableOpacity
                                    style={style.signUpBotton}
                                >
                                    <Text style={{ color: 'white' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{ fontSize: 17 }}>or</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={[style.signUpBotton, {}]}
                                >
                                    <Text style={{ color: 'white' }}>Sign Up with Google</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center', backgroundColor:'red'}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Already have an account? </Text>
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
        paddingHorizontal: '5%'
    },
    signUp: {
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    signUpText: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    logInButton: {
        fontWeight: '700',
        color: '#0071DF',
        textDecorationLine: 'underline'
    },
    form: {
        marginTop:'5%'
    },
    insideForm: {
        marginBottom: '5%'
    },
    textInput: {
        marginTop: '2%',
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
        height: 20,
        width: 20,

    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    policyText: {
        color: '#9CA5B4',
        textDecorationLine: 'underline'
    },
    signUpBotton: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: '4%'
    }
})
