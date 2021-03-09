import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Register from './screens/Register/index'
import Login from './screens/Login/index'
import Home from './screens/Home/index'

const AuthStack = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            headerShown:false
        }
    },
    Register:{
        screen:Register,
        navigationOptions:{
            headerShown:false
        }
    },
    Home:{
        screen:Home
    }
}
)

export default createAppContainer(AuthStack)