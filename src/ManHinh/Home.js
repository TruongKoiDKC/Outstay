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


export default class Home extends React.Component {
    render() {

        return(
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={{color:'#93278f', fontSize: 30, fontWeight:'bold' }}>Outstay</Text>
          </View>

          <View style={styles.body}>
            <View style={styles.ImageBackgroundTop}>
              <View>
                <TouchableOpacity onPress={this._onPressButton}>
                   <Image
                   style={{width: 90, height: 90, marginLeft: 70, marginTop: 40}}
                   source={require('../images/iconfinder_compose_406731.png')}
                   />
                  <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20, marginLeft: 80 }}>
                    Dịch vụ
                  </Text>
                </TouchableOpacity>
                
              </View>

              <View>
                <TouchableOpacity onPress={this._onPressButton}>
                  <Image 
                  style={{width: 90, height: 90, marginLeft: 90, marginTop: 40}}
                  source={require('../images/iconfinder_door_406820.png')}
                  />
                  <Text style={{fontStyle:'italic',fontWeight: 'bold', fontSize: 20, marginLeft: 90 }}>
                    Phòng trọ
                  </Text>
                </TouchableOpacity> 
              
              </View>
            </View>

            <View style={styles.ImageBackgroundMid}>
              <View>
                <TouchableOpacity>
                <Image
                 style={{width: 90, height: 90, marginLeft: 70, marginTop: 40}}
                  source={require('../images/iconfinder_calculator_406835.png')}
                />
                <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20, marginLeft: 80 }}>
                    Hóa đơn
                  </Text>
                </TouchableOpacity>
                
              </View>

              <View>
                <TouchableOpacity>
                <Image
                 style={{width: 90, height: 90, marginLeft: 90, marginTop: 40}}
                  source={require('../images/iconfinder_barchart_406826.png')}
                />
                <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20, marginLeft:90 }}>
                    Thống kê
                </Text>
                </TouchableOpacity>
                
              </View>
            </View>

            <View style={styles.ImageBackgroundBot}>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhChat")}>
              <Image
                 style={{width: 90, height: 90, marginLeft: 70, marginTop: 40}}
                  source={require('../images/iconfinder_chat_406814.png')}
                />
                <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20, marginLeft: 80 }}>
                    Nhắn tin
                </Text>
              </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity>
                  <Image
                   style={{width: 90, height: 90, marginLeft: 90, marginTop: 40}}
                    source={require('../images/iconfinder_gear_406863.png')}
                  />
                  <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 20, marginLeft: 105 }}>
                    Cài đặt
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
              <Image
                  source={require("../images/iconfinder_star_406773.png")}
                  style={{width: 60, height: 60}}
              >
              </Image>
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
      justifyContent:'center' 
    },

    header: {
      flex:0.3,
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
    },

    body: {
        backgroundColor: '#E3E3E3',
        flex:4.0
    },

    footer:{
        flex: 0.5,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center'
    },

    ImageBackgroundTop:{
        flex: 1,
        flexDirection: "row",
    },

    ImageBackgroundMid:{
      flex: 1,
      flexDirection: "row",
    },

    ImageBackgroundBot:{
      flex: 1,
      flexDirection: "row",
    },
});