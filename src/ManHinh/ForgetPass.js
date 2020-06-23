import React from 'react';
import { StyleSheet, 
        View, TouchableOpacity,
        Text, TextInput, 
        Button, Alert,
        StatusBar, ScrollView,
        Animated, Dimensions, 
    } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { TypingAnimation } from 'react-native-typing-animation';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
              //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
              databaseURL: 'https://fir-outstay.firebaseio.com',
              storageBucket: 'fir-outstay.appspot.com',
            });
          }
        this.state = { 
            email: "",

            animation_login : new Animated.Value(width-40),
            enable:true
        };
    }
    _foucus(value){
        if(value=="email"){
          this.setState({
            email: true,
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
            email: false,
          })
        }, 150);
      }

    goLogin(){
        const {navigate} = this.props.navigation;
        navigate('ManHinhLogin');
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert(
                    'Thông báo !!!',
                    "Email đặt lại mật khẩu đã được gửi.",
                    [
                        {text: 'OK', onPress: () => this.goLogin()},
                    ],
                      { cancelable: false }
                );

            }, (error) => {
                Alert.alert(error.message);
            });
    }

    // onBackToLoginPress = () => {
    //     var navActions = NavigationActions.reset({
    //         index: 0,
    //         actions: [NavigationActions.navigate({routeName: "ManHinhLogin"})]
    //     });
    //     this.props.navigation.dispatch(navActions);
    // }

    render() {
        const width = this.state.animation_login;
        return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>Quên mật khẩu</Text>
            </View>

            <ScrollView>
                <View style={{marginTop:40}}>
                    <Text style={{fontSize: 25, fontWeight:"bold"}}>
                    Xin chào,
                    </Text>
                    <Text style={{fontSize: 15}}>
                    Hãy đặt lại mật khẩu của bạn tại đây !
                    </Text>
                </View>

                <View style={styles.action}>
                    <TextInput
                            value={this.state.email}
                            onChangeText={(text) => { this.setState({email: text}) }}
                            style={styles.textInput}
                            placeholder="Email"
                            onFocus={()=>this._foucus("email")}
                            keyboardType='email-address'
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        {this.state.email ?
                        this._typing()
                        : null}
                </View>


                <TouchableOpacity onPress={() => {this.onResetPasswordPress()}}>
                    <View style={styles.button_container}>
                    <Animated.View style={[styles.animation,{width}]}>
                        {this.state.enable ?
                        <Text style={styles.textLogin}>Đặt lại mật khẩu</Text>
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
