import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Register from './screens/Register/index'
import RegisterGoogle from './screens/Register/index1'
import Home from './screens/Home/index'

const AuthStack = createStackNavigator({
    Register:{
        screen:Register,
        navigationOptions:{
            headerShown:false
        }
    },
    RegisterGoogle:{
        screen:RegisterGoogle
    },
    Home:{
        screen:Home
    }
},{
    initialRouteName:'RegisterGoogle'
})

export default createAppContainer(AuthStack)