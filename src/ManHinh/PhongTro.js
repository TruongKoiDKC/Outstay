import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from "react-native"

import { SearchBar } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class PhongTro extends React.Component {
    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };
    
    render() {
        const { search } = this.state;

        return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                <View style={{flex: 1}}>
                </View>

                <View style={{flex: 3, alignItems:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Phòng trọ
                    </Text>
                </View>

                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhCTPT')}>
                        <Icon
                            name='plus'
                            type='FontAwesome5'
                            style={{fontSize:25, marginLeft:"60%"}}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginTop: 10}}>
                <SearchBar
                    placeholder="Tìm kiếm ..."
                    onChangeText={this.updateSearch}
                    value={search}
                    platform ="android"
                    underlineColorAndroid = "#5aaf76"
                />
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

})
