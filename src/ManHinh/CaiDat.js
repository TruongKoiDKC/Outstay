import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem } from 'react-native-elements';

const Caidat = [
  {
    title:'Thông tin tài khoản',
    subtitle:'Nhập thông tin'
  }]

const Caidat1 = [
  {
    title:'Hỗ trợ',
    subtitle:'Nhập thông tin'
  }]

const Caidat2 = [
  {
    title:'Liên hệ với chúng tôi',
    subtitle:'Nhập thông tin'
  },
]

export default class Home extends React.Component {
    render() {
        return(
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
              Cài đặt
            </Text>
          </View>

          <View style={{marginTop: "5%"}}>
          {Caidat.map((CD,index) =>(
            <ListItem onPress={() => this.props.navigation.navigate('ManHinhPhongTro')}
            bottomDivider
            chevron
            key={index}
            title={CD.title}
            subtitle={CD.subtitle}/>
          ))
          }
          </View>

          <View style={{marginTop: "5%"}}>
          {Caidat1.map((CD1,index) =>(
            <ListItem onPress={() => this.props.navigation.navigate('ManHinhDichVu')}
            bottomDivider
            chevron
            key={index}
            title={CD1.title}
            subtitle={CD1.subtitle}/>
          ))
          }
          </View>

          <View style={{marginTop: "5%"}}>
          {Caidat2.map((CD2,index) =>(
            <ListItem onPress={() => this.props.navigation.navigate('ManHinhHoaDon')}
            bottomDivider
            chevron
            key={index}
            title={CD2.title}
            subtitle={CD2.subtitle}/>
          ))
          }
          </View>

          <View>
            <TouchableOpacity>
              <Animated.View style={styles.DX}>
                <Text style={{fontSize: 18, color:'white', fontWeight:'bold'}}>Đăng xuất</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
}

const width = Dimensions.get("screen").width;
var styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'white',
      padding: "5%"
    },

    DX:{
        borderColor:'#ff4343',
        backgroundColor:'#ff4343',
        padding: 15,
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        marginTop: 280
    }

});