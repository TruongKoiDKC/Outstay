import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
export default class Home extends React.Component {
    render() {
        return(
        <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhHome")}>
                <Image
                    source={require("../images/iconfinder_left_2_4829870.png")}
                    style={{width: 25, height: 25,marginRight: 100}}
                >
                </Image>
            </TouchableOpacity>    

                <Text style={{color:'#93278f', fontSize: 30, fontWeight:'bold',marginRight:100}}>Outstay</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu_Them")}>
                    <Image
                        source={require("../images/iconfinder_plus_4115237.png")}
                        style={{width: 25, height: 25}}
                    >
                    </Image>
            </TouchableOpacity>
          </View>

          <View style={styles.tabbar}>
            <ScrollableTabView
                    style={{marginTop: 10, }}
                    initialPage={1}
                    tabBarActiveTextColor= 'black'
                    renderTabBar={() => <DefaultTabBar 
                        underlineStyle={{
                            backgroundColor:'#93278f'
                        }}/>}
                >
                    <Text tabLabel='Dịch vụ'>Loại phòng</Text>
                    <Text tabLabel='Loại phòng'>Loại phòng</Text>
            </ScrollableTabView>
             
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
      flexDirection: "row",
      //backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center'
      
    },
    tabbar:{
        flex: 4,
    },

    body: {
        backgroundColor: '#E3E3E3',
        flex:4.0,
        alignItems: 'center',
        justifyContent: 'center'

    },

});