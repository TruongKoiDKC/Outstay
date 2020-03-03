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
        dotColor="#93278f"
        style={{marginRight:25}}
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
          <View style={styles.header}>
              <ImageBackground
                source={require("../images/header.png")}
                style={styles.imageBackground}
                resizeMode = "contain"
              >
              </ImageBackground>
          </View>
          <View style={styles.footer}>
                
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
                        <Animated.View style={[styles.animation,{
                          width
                        }]}>
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

                <View style={styles.signUp}>
                      <Text style={{color:'red'}}> Bạn đã có mật khẩu chưa ?</Text>
                </View>

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
    justifyContent:'center'
  },
  header: {
    flex:1,
  },
  footer: {
    marginTop:200,
    flex:2,
    padding:20
  },
  imageBackground:{
    flex:1,
    justifyContent:'center',
    marginTop : 10,
    alignSelf:'center',
    width:250,
    height:250
  },
  title: {
    color:'black',
    fontWeight:'bold'
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:'#93278f'
  },
  textInput: {
    flex:1,
    marginTop:5,
    paddingBottom:5,
    color:'gray',
    fontStyle: 'italic'
  },
  button_container: {
    alignItems: 'center',
    justifyContent:'center'
  },
  animation: {
    backgroundColor:'#93278f',
    paddingVertical:10,
    marginTop:30,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
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
