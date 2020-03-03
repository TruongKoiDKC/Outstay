import React, { Component } from 'react'
import { Text, View } from 'react-native'

import RootStack from '../src/RootStack'; 
//import thư viện này để App có thể chạy dc các Component trong src 

export default class App extends Component {
    render() {
        return (
           <RootStack />
        )
    }
}
