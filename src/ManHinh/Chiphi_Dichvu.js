import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
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
                            Chi phí dịch vụ
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ManHinhDichVu')}>
                        <Icon
                            name='check'
                            type='FontAwesome5'
                            style={{fontSize: 25, marginLeft:'60%'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <ScrollView>
                        <View style={{flex: 1, marginTop: 20}}>
                            <Animated.View style={styles.vienkhung}>
                            <View style={{padding: 8}}>
                            <TextInput
                                placeholder='Tên phí dịch vụ'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Đơn giá'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            <TextInput
                                placeholder='Đơn vị tính'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                            />
                            </View> 
                            </Animated.View>    
                        </View>
                    </ScrollView>
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

    vienkhung:{
        paddingVertical:10,
        borderColor: '#5aaf76',
        borderWidth: 4,
        padding: 15,
        borderRadius: 20
    },
})