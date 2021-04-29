import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import UrlIndex from '../../methods/url'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class App extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        AsyncStorage.getItem('User_Token').then((res) => {
            const user_token = res
            const url = UrlIndex + 'token-check'
            axios({
                method: 'POST',
                url: url,
                headers: { 'token' : user_token }
            })
            .then((res) => {
                if(res.data['Result'] == true){
                    this.props.navigation.navigate('App')
                } 
                else{
                    AsyncStorage.setItem('User_Token','')
                    AsyncStorage.getItem("Language").then((res) => {
                        console.log(res)
                        (res == "En") ? this.props.navigation.navigate('EnLogin') : this.props.navigation.navigate('TrLogin')
                    })                    
                }                    
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data)
                AsyncStorage.setItem('User_Token','')
                AsyncStorage.getItem("Language").then((res) => {
                    (res == "En") ? this.props.navigation.navigate('EnLogin') : this.props.navigation.navigate('TrLogin')
                })
            })

        })
    }

    render() {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }
}
