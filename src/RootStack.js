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
import DichVu_Them from './ManHinh/DichVu_Them';
import LoaiPhong from './ManHinh/LoaiPhong';
import Chitiet_PhongTro from "./ManHinh/Chitiet_PhongTro";
import KhachHang from "./ManHinh/KhachHang";
import HopDong from "./ManHinh/HopDong";
import Chiphi_Dichvu from "./ManHinh/Chiphi_Dichvu"

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
                        color={"#5aaf76"} />
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
                        color={"#5aaf76"} />
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
                        color={"#5aaf76"} />
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
                        color={"#5aaf76"} />
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
            tabBarLabel: 'Nhắn tin',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="message" size={25}
                        color={"#5aaf76"} />
                    )
                }
                else{
                    return(
                        <MaterialIcons name="message" size={25}
                        color={"gray"} />
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
                        color={"#5aaf76"} />
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

    ManHinhCaiDat:{
        screen:CaiDat,
        navigationOptions:{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({tintColor,focused}) => {
                if(focused){
                    return (
                        <MaterialIcons name="settings" size={25}
                        color={"#5aaf76"} />
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
    ManHinhCTPT: {
        screen: Chitiet_PhongTro,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhKhachHang:{
        screen: KhachHang,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhHopDong:{
        screen: HopDong,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhLoaiPhong:{
        screen: LoaiPhong,
        navigationOptions:{
            headerShown: false
        }
    },
    ManHinhCPDV:{
        screen: Chiphi_Dichvu,
        navigationOptions:{
            headerShown: false
        }
    },
});

export default createAppContainer(StackNav);

