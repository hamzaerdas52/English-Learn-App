import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogOutUser = () => {
    AsyncStorage.setItem("User_Token","")
}

export default LogOutUser
 