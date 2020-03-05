import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator,createSwitchNavigator} from "react-navigation-stack";

import Login from './ManHinh/Login';
import Home from './ManHinh/Home';
import CreateAcc from './ManHinh/CreateAcc';
import Chat from './ManHinh/Chat';
import Splash from './ManHinh/Splash';



const StackNav = createStackNavigator({
    ManHinhSplash:{
        screen: Splash,
        navigationOptions:{
            headerShown: false
        }
    },

    ManHinhLogin: {
        screen: Login,
        navigationOptions:{
            headerShown: false
        }
    },

    ManHinhHome: {
        screen: Home,
        navigationOptions:{
            headerShown: false
        }
    },

    ManHinhTaoTK: {
        screen: CreateAcc,
        navigationOptions:{
            headerShown: false
        }
    },

    ManHinhChat: {
        screen: Chat,
        navigationOptions:{
            headerShown: false
        }
    },


});



export default createAppContainer(StackNav);

