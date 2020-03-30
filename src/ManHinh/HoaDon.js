import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Animated,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import { SearchBar } from 'react-native-elements'

export default class HoaDon extends Component {
    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };

    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                        Hóa đơn
                    </Text>
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
    }
});
