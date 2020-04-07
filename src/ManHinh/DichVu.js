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
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { ScrollView } from "react-native-gesture-handler";

export default class Home extends React.Component {

  //Menu chọn Loại phòng và Chi phí dịch vụ
  menu = null;
  setMenuRef = ref => {
    this.menu = ref;
  };
  showMenu = () => {
    this.menu.show();
  };
  LP(){
      const {navigate} = this.props.navigation;
      navigate('ManHinhLoaiPhong');
  }
  CPDV(){
      const {navigate} = this.props.navigation;
      navigate('ManHinhCPDV');
  }

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
                <Menu
                  style={{width: 150, height: 100}}
                  ref={this.setMenuRef}
                  button={ 
                    <Text style={{marginLeft: '90%'}} onPress={this.showMenu}>
                      <Icon
                        name='ellipsis-v'
                        type='FontAwesome5'
                        style={{fontSize: 25}}
                    />
                    </Text>}>
                  <MenuItem onPress={() => this.props.navigation.navigate('ManHinhLoaiPhong')}>Loại phòng</MenuItem>
                  <MenuItem onPress={() => this.props.navigation.navigate('ManHinhCPDV')}>Phí dịch vụ</MenuItem>
                  <MenuItem onPress={this.hideMenu} disabled> </MenuItem>
                </Menu>
              </View>

              <View>
                <ScrollView>
                  
                </ScrollView>
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
    padding: "5%"
  },

  
});