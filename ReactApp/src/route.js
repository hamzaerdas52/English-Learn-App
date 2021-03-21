import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import EnRegister from './screens/Register/EnglishIndex'
import TrRegister from './screens/Register/TurkishIndex'
import EnLogin from './screens/Login/EnglishIndex'
import TrLogin from './screens/Login/TurkishIndex'
import Home from './screens/Home/index'
import Drawer from './screens/Drawer/index'
import Auth from './screens/Auth/index'

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
    EnRegister:{
        screen:EnRegister,
        navigationOptions:{
            headerShown:false
        }
    },
    TrRegister:{
        screen:TrRegister,
        navigationOptions:{
            headerShown:false
        }
    }
},{
    initialRouteName:'EnLogin'
}
)

const AppStack = createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions:{
            headerShown: false
        }
    },
    Drawer : {
        screen : Drawer
    }
})

const DrawerStack = createDrawerNavigator({
    Home : AppStack
},{
    contentComponent:Drawer
})

const SwitchNavigator = createSwitchNavigator({
    App:DrawerStack,
    Auth,
    Authenticate:AuthStack
},{
    initialRouteName:'Auth'
})

export default createAppContainer(SwitchNavigator)