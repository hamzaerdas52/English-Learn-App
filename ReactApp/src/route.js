import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Register from './screens/Register/index'
import EnLogin from './screens/Login/EnglishIndex'
import TrLogin from './screens/Login/TurkishIndex'
import Home from './screens/Home/index'

import Index from './screens/Login/index'

const AuthStack = createStackNavigator({
    // Index:{
    //     screen:Index,
    //     navigationOptions:{
    //         headerShown:false,
    //     }
    // },

    EnLogin:{
        screen:EnLogin,
        navigationOptions:{
            headerShown:false
        }
    },
    TrLogin:{
        screen:TrLogin,
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