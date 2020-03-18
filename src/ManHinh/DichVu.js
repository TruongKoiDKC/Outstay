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
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Dịch vụ
                    </Text>
                </View>
             
                <View style={styles.tabbar}>
                  <ScrollableTabView
                    style={{marginTop: 10,}}
                    initialPage={1}
                    tabBarActiveTextColor= 'black'
                    renderTabBar={() => <DefaultTabBar 
                      underlineStyle={{
                        backgroundColor:'black'
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
    padding: 20
  },

  tabbar:{
    flex: 4
  }
});