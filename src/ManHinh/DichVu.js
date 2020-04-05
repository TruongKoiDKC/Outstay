import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends React.Component {

    render() {
        return(
          <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
              <View style={{flex: 1}}>
              </View>

              <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Dịch vụ
                    </Text>
              </View>

              <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu_Them")}>
                <Icon
                  name='plus'
                  type='FontAwesome5'
                  style={{fontSize:25, marginLeft:"80%"}}
                />
              </TouchableOpacity>
              </View>

            </View>
                <View style={styles.tabbar}>
                  <ScrollableTabView
                    style={{marginTop: 10,}}
                    initialPage={1}
                    tabBarActiveTextColor= '#5aaf76'
                    renderTabBar={() => <DefaultTabBar 
                      underlineStyle={{
                        backgroundColor:'#5aaf76'
                      }}/>}
                  >
                    <Text tabLabel='Dịch vụ'>Dịch vụ</Text>
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
    padding: "5%"
  },

  tabbar:{
    flex: 4
  }
});