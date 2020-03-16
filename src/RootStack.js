import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator,
         createSwitchNavigator,} from "react-navigation-stack";
import { createBottomTabNavigator} from 'react-navigation-tabs';        
import Login from './ManHinh/Login';
import Home from './ManHinh/Home';
import CreateAcc from './ManHinh/CreateAcc';

import Splash from './ManHinh/Splash';

import Chat from './ManHinh/Chat';
import HoaDon from './ManHinh/HoaDon';
import PhongTro from './ManHinh/PhongTro';
import DichVu from './ManHinh/DichVu';
import ThongKe from './ManHinh/ThongKe';
import CaiDat from './ManHinh/CaiDat';

import DichVu_Them from './ManHinh/DichVu_Them';

//import các thư viện Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const TabsNav = createBottomTabNavigator({
    ManHinhHome:{
        screen:Home,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="home" size={28}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="home" size={28}
                        color={"#93278f"} />
                )
                }
            }
        }
    },
    ManHinhDichVu:{
        screen:DichVu,
        navigationOptions:{
            tabBarLabel: 'Dịch vụ',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <Foundation name="clipboard-notes" size={25}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <Foundation name="clipboard-notes" size={25}
                        color={"#93278f"} />
                )
                }
            }
        }
    },
    ManHinhPhongTro:{
        screen:PhongTro,
        navigationOptions:{
            tabBarLabel: 'Phòng trọ',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <FontAwesome5 name="door-open" size={22}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <FontAwesome5 name="door-open" size={22}
                        color={"#93278f"} />
                )
                }
            }
        }
    },
    ManHinhHoaDon:{
        screen:HoaDon,
        navigationOptions:{
            tabBarLabel: 'Hoá đơn',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <FontAwesome5 name="receipt" size={23}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <FontAwesome5 name="receipt" size={23}
                        color={"#93278f"} />
                )
                }
            }
        }
    },
    ManHinhThongKe:{
        screen:ThongKe,
        navigationOptions:{
            tabBarLabel: 'Thống kê',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <Foundation name="graph-trend" size={30}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <Foundation name="graph-trend" size={30}
                        color={"#93278f"} />
                )
                }
            }
        }
    },
    ManHinhChat:{
        screen:Chat,
        navigationOptions:{
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="message" size={25}
                        color={tintColor} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="message" size={25}
                        color={"#93278f"} />
                )
                }
            }
        }
    }
})

//stack chuyển màn hình 
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
    // Chỗ này là để BottomTab hiện trong screen Home
    ManHinhHome: {
        screen: TabsNav,
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
    ManHinhCaiDat: {
        screen: CaiDat,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhDichVu: {
        screen: DichVu,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhDichVu_Them: {
        screen: DichVu_Them,
        navigationOptions:{
            headerShown: false
        }
    },
  
  
});

export default createAppContainer(StackNav);

