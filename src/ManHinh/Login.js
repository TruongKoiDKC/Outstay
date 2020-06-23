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
  TouchableOpacity,
} from "react-native";
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome  from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import { ScrollView } from "react-native-gesture-handler";
import { SocialIcon } from 'react-native-elements'
import firebase  from 'react-native-firebase'
import { GoogleSignin , statusCodes} from '@react-native-community/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

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
        style={{marginRight:25, marginTop:50}}
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
  
  CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.typedEmail != '') {
          //Check for the Name TextInput
          if (this.state.typedPassword != '') {
            //Check for the Email TextInput
            Alert.alert('Success')
          } else {
            Alert.alert('Please Enter Email');
          }
        } else {
          Alert.alert('Please Enter Name');
        }
  };

  goHome(){
    const {navigate} = this.props.navigation;
    navigate('ManHinhLogin');
  }

  //Đăng nhập bằng Email vs Password push lên firebase 
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
        typedPassword:'',
      }
      )
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
  
  

  //Google Login 
  componentDidMount(){
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '409483301695-ff7d5576e5vus75pr0ud2kf157hjgbc9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  _signInGG= async()=>{
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      firebase.auth().signInWithCredential(credential);
      Alert.alert(
        'Thông báo !!!',
        'Đăng nhập Google thành công !',
        [
          {text: 'OK', onPress: () => this.goHome()},
        ],
        { cancelable: false }
      )
      this.setState({
        typedEmail:'',
        typedPassword:''
      })
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  
  }


  //Đăng nhập bằng FB 
  _signInFB= async()=>{
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
 
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();
 
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    await firebase.auth().signInWithCredential(credential);

    Alert.alert(
      'Thông báo !!!',
      'Đăng nhập Facebook thành công !',
      [
        {text: 'OK', onPress: () => this.goHome()},
      ],
      { cancelable: false }
    )
    this.setState({
      typedEmail:'',
      typedPassword:'',
    }
    )
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

          <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhQuenTK")}>
            <View style={{marginTop: 20, flexDirection:'row', justifyContent:'center'}}>
              <Text style={{color:'red', fontSize:15}}> Quên mật khẩu ?</Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: 20, alignItems:"center"}}>
            <Text>Hoặc</Text>
          </View>

          <View style={styles.fbgm}>
            <View>
              <TouchableOpacity onPress={this._signInFB}>
              <SocialIcon
                title='FACEBOOK'
                button
                type='facebook'
                style={{height:50, width:130, borderRadius:10,marginLeft:5}}/>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={this._signInGG}>
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
    color:'gray',
    fontSize: 15
  },

  button_container: {
    alignItems: 'center',
    justifyContent:'center'
  },

  animation: {
    backgroundColor:'#5aaf76',
    paddingVertical:10,
    marginTop: 30,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center',
  },

  textLogin: {
    color:'white',
    fontWeight:'bold',
    fontSize:20,
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