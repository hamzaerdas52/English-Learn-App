import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

const SetLanguage = (language) => {
    AsyncStorage.setItem("Language",language)
}

export default SetLanguage
