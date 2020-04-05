import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class HopDong extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:"center", alignItems:"center"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhDichVu")}>
                            <Icon
                            name='chevron-left'
                            type='FontAwesome5'
                            style={{fontSize: 20}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems:"center"}}>
                        <Text style={{color:'black', fontSize: 21, fontWeight:'bold'}}>
                            Hợp đồng 
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhHome')}>
                        <Icon
                            name='check'
                            type='FontAwesome5'
                            style={{fontSize: 25, marginLeft:'60%'}}
                            />
                        </TouchableOpacity>
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
})