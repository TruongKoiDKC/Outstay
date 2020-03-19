import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator,
         createSwitchNavigator,} from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';        

import Login from './ManHinh/Login';
import CreateAcc from './ManHinh/CreateAcc';

import Splash from './ManHinh/Splash';

import Chat from './ManHinh/Chat';
import HoaDon from './ManHinh/HoaDon';
import PhongTro from './ManHinh/PhongTro';
import DichVu from './ManHinh/DichVu';
import ThongKe from './ManHinh/ThongKe';
import CaiDat from './ManHinh/CaiDat';

<<<<<<< HEAD
<<<<<<< HEAD
import DichVu_Them from './ManHinh/DichVu_Them';
=======
import LoaiPhong from './ManHinh/LoaiPhong';
>>>>>>> Tien
=======
import LoaiPhong from './ManHinh/LoaiPhong';
>>>>>>> 76b85a003646c0616021370080f04356df0e07cb

//import các thư viện Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const TabsNav = createBottomTabNavigator({
    ManHinhPhongTro:{
        screen:PhongTro,
        navigationOptions:{
            tabBarLabel: 'Phòng trọ',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <FontAwesome5 name="door-open" size={22}
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <FontAwesome5 name="door-open" size={22}
                        color={"gray"} />
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
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <Foundation name="clipboard-notes" size={25}
                        color={"gray"} />
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
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <FontAwesome5 name="receipt" size={23}
                        color={"gray"} />
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
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <Foundation name="graph-trend" size={30}
                        color={"gray"} />
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
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="message" size={25}
                        color={"gray"} />
<<<<<<< HEAD
                )
                }
            }
        }
    },

    ManHinhCaiDat:{
        screen:CaiDat,
        navigationOptions:{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="settings" size={25}
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="settings" size={25}
                        color={"gray"} />
=======
>>>>>>> 76b85a003646c0616021370080f04356df0e07cb
                )
                }
            }
        }
    },
<<<<<<< HEAD
=======

    ManHinhCaiDat:{
        screen:CaiDat,
        navigationOptions:{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="settings" size={25}
                        color={"black"} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="settings" size={25}
                        color={"gray"} />
                )
                }
            }
        }
    },
>>>>>>> 76b85a003646c0616021370080f04356df0e07cb
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
<<<<<<< HEAD
<<<<<<< HEAD
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
  
  
=======
    
>>>>>>> Tien
=======
    
>>>>>>> 76b85a003646c0616021370080f04356df0e07cb
});

export default createAppContainer(StackNav);

