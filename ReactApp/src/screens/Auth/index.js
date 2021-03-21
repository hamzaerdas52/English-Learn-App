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
                console.log(res.data['Result'])
                if(res.data['Result'] == true){
                    this.props.navigation.navigate('App')
                } 
                else{
                    AsyncStorage.setItem('User_Token','')
                    this.props.navigation.navigate('Authenticate')
                }
                    
            })
            .catch((error) => {
                console.log(error.response.data)
                AsyncStorage.setItem('User_Token','')
                this.props.navigation.navigate('Authenticate')
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
