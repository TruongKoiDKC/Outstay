import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome  from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import { ScrollView } from "react-native-gesture-handler";
import { SocialIcon } from 'react-native-elements'
import firebase from 'react-native-firebase'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      typing_email: false,
      typing_password: false,
      animation_login : new Animated.Value(width-40),
      enable:true ,
    }
  }

  _foucus(value){
    if(value=="email"){
      this.setState({
        typing_email: true,
        typing_password: false
      })
    }
    else{
      this.setState({
        typing_email: false,
        typing_password: true
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
        typing_password: false
      })
    }, 150);
  }

  goHome(){
    const {navigate} = this.props.navigation;
    navigate('ManHinhHome');
  }

  Dangnhap(){
    firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
    .then(()=>{
      Alert.alert(
        'Thông báo !!!',
        'Đăng nhập thành công !',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.goHome()},
        ],
        { cancelable: false }
      )
      this.setState({
        typedEmail:'',
        typedPassword:''
      })
    })
    .catch(function(error) {
      Alert.alert(
        'Thông báo !!!',
        'Đăng nhập thất bại !',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    });
  }

  render(){
    const width = this.state.animation_login;
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
          
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>Đăng nhập</Text>
          </View>

          <ScrollView>
          <View style={{marginTop: 40}}>
            <Text style={{fontSize: 25, fontWeight:"bold"}}>
              Chào mừng,
            </Text>
            <Text style={{fontSize: 15}}>
              Hãy đăng nhập tài khoản Outstay của bạn.
            </Text>
          </View>

          <View style={styles.action}>
            <TextInput 
              placeholder="Tên đăng nhập"
              style={styles.textInput}
              onFocus={()=>this._foucus("email")}
              onChangeText={
                (text) => {
                  this.setState({ typedEmail: text});
                }
              }
            />
              {this.state.typing_email ?
              this._typing()
              : null}
          </View>

          <View style={styles.action}>
            <TextInput 
              secureTextEntry
              placeholder="Mật Khẩu"
              style={styles.textInput}
              onFocus={()=>this._foucus("password")}
              onChangeText={
                (text) => {
                  this.setState({ typedPassword: text});
                }
              }
            />
              {this.state.typing_password ?
              this._typing()
              : null}


          </View>
                
          <TouchableOpacity onPress={() => {this.Dangnhap()}}>
            <View style={styles.button_container}>
              <Animated.View style={[styles.animation,{width}]}>
                {this.state.enable ?
                <Text style={styles.textLogin}>Đăng Nhập</Text>
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

          <View style={{alignItems: "center",justifyContent:"center", marginTop: 10}}>
            <Text style={{color:'red'}}> Quên mật khẩu ?</Text>
          </View>

          <View style={{marginTop: 20, alignItems:"center"}}>
            <Text>Hoặc</Text>
          </View>

          <View style={styles.fbgm}>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("") }>
              <SocialIcon
                title='FACEBOOK'
                button
                type='facebook'
                style={{height:50, width:130, borderRadius:10,marginLeft:5}}/>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
              <SocialIcon
                title='GMAIL'
                button
                type='google'
                style={{height:50, width:130, borderRadius:10,marginRight:5}}/>
              </TouchableOpacity>
            </View>
          </View>    

          <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhTaoTK")}>
            <View style={{marginTop: 30, alignItems:"center"}}>
              <Text style={{color:'black', fontSize: 18, color:"#b0ada9"}}>Bạn không có tài khoản? 
                <Text style={{color: "#5aaf76", fontWeight:"bold", fontSize: 20}}>  Đăng ký</Text>
              </Text>
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
    padding: "5%"
  },

  action: {
    flexDirection: 'row',
    borderBottomWidth:1.5,
    borderBottomColor:'#5aaf76'
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
    backgroundColor:'#5aaf76',
    paddingVertical:10,
    marginTop: 40,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
  },

  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:20
  },

  fbgm: {
    marginTop: 25,
    justifyContent:"center",
    flexDirection:'row',
  },

  btfb:{
    backgroundColor: '#58a0e8',
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#58a0e8',
    borderWidth: 2,
    width: 150,
    height: 50,
  },

  btgmail:{
    backgroundColor: '#e85858',
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#e85858',
    borderWidth: 2,
    width: 150,
    height: 50,
  }
});