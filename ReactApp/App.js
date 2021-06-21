import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Route from './src/route'
import NavigationService from './src/components/NavigationService'

export default class App extends Component {
  render() {
    return (
      <Route
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}
