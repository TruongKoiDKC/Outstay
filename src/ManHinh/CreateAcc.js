import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import { ScrollView } from "react-native-gesture-handler";



export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      typing_email: false,
      typing_password: false,
      typing_repassword:false,
      animation_login : new Animated.Value(width-40),
      enable:true
    }
  }

  _foucus(value){
    if(value=="email"){
      this.setState({
        typing_email: true,
        typing_password: false,
        typing_repassword: false
      })
    }

    else if(value=="password"){
        this.setState({
          typing_email: false,
          typing_password: true,
          typing_repassword: false
        })
      }
      
    else{
        this.setState({
          typing_email: false,
          typing_password: false,
          typing_repassword: true
        })
      }
  }

  _typing(){
    return(
      <TypingAnimation 
        dotColor="black"
        style={{marginRight:25,marginTop:50}}
      />
    )
  }

  _animation(){
    Animated.timing(
      this.state.animation_login,
      {
        toValue: 40,
        duration: 250
      }
    ).start();

    setTimeout(() => {
      this.setState({
        enable:false,
        typing_email: false,
        typing_password: false,
        typing_repassword: false
      })
    }, 150);
  }

  render(){
    const width = this.state.animation_login;
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>Đăng ký</Text>
          </View>

          <ScrollView>
          <View style={{marginTop:40}}>
            <Text style={{fontSize: 25, fontWeight:"bold"}}>
              Xin chào,
            </Text>
            <Text style={{fontSize: 15}}>
              Hãy tạo tài khoản Outstay của bạn.
            </Text>
          </View>

          <View style={styles.action}>
            <TextInput 
              placeholder="Tên đăng nhập"
              style={styles.textInput}
              onFocus={()=>this._foucus("email")}
            />
              {this.state.typing_email ?
              this._typing()
              : null}
          </View>

          <View style={styles.action}>
            <TextInput 
              secureTextEntry
              placeholder="Mật khẩu"
              style={styles.textInput}
              onFocus={()=>this._foucus("password")}
            />
              {this.state.typing_password ?
              this._typing()
              : null}
          </View>

          <View style={styles.action}>
            <TextInput 
              secureTextEntry
              placeholder="Xác nhận mật khẩu"
              style={styles.textInput}
              onFocus={()=>this._foucus("repassword")}
            />
              {this.state.typing_repassword ?
              this._typing()
              : null}
          </View>
                
          <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
            <View style={styles.button_container}>
              <Animated.View style={[styles.animation,{width}]}>
                {this.state.enable ?
                  <Text style={styles.textLogin}>Đăng ký</Text>
                    :
                  <Animatable.View
                    animation="bounceIn"
                    delay={50}>
                    <FontAwesome 
                      name="check"
                      color="white"
                      size={20}
                    />
                  </Animatable.View>
                }
              </Animated.View>
            </View>   
          </TouchableOpacity>     

          <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
            <View style={styles.signUp}>
              <Text style={{color:'red'}}>Bạn đã có mật khẩu ?</Text>
            </View>
          </TouchableOpacity> 
          </ScrollView>             
      </View>
    )
  }
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    padding: 20
  },

  action: {
    flexDirection: 'row',
    borderBottomWidth:1.5,
    borderBottomColor:'black'
  },

  textInput: {
    flex:1,
    marginTop:30,
    paddingBottom:5,
    color:'gray'
  },
  
  button_container: {
    alignItems: 'center',
    justifyContent:'center'
  },

  animation: {
    backgroundColor:'black',
    paddingVertical:10,
    marginTop:50,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
  },

  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:18
  },

  signUp: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20,
  }
});
