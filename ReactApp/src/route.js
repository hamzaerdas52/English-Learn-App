import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Register from './screens/Register/index'

const AuthStack = createStackNavigator({
    Register:{
        screen:Register,
        navigationOptions:{
            headerShown:false
        }
    }
})

export default createAppContainer(AuthStack)