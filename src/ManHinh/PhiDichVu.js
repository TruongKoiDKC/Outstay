import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    YellowBox,
    FlatList,
} from 'react-native'

import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';


YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
    }
};

try {
    firebase.initializeApp({
    apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
    //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
    databaseURL: 'https://fir-outstay.firebaseio.com',
    storageBucket: 'fir-outstay.appspot.com',
    })
    } catch (err) {
    // we skip the “already exists” message which is
    // not an actual error when we’re hot-reloading
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
    
}}

const rootRef = firebase.database().ref();
const PhiDVRef = rootRef.child('Phí dịch vụ');

export default class Chiphi_Dichvu extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            PhiDichVu: [],
            textTenPhiDV: '',
            textDonGiaPhiDV: '',
            textDVTPhiDV: '',
            loading: false,
        });
    }
    componentDidMount() {
        PhiDVRef.on('value', (childSnapshot) => {
            const PhiDichVu = [];
            childSnapshot.forEach((doc) => {
                PhiDichVu.push({
                    key: doc.key,
                    PhiDichVu: doc.toJSON().PhiDichVu,
                    DonGia: doc.toJSON().DonGia,
                    DonViTinh: doc.toJSON().DonViTinh,
                    
                });
                this.setState({
                    PhiDichVu: PhiDichVu.sort((a, b) => {
                        return (a.PhiDichVu < b.PhiDichVu);
                    }),
                    loading: false,
                    PhiDichVu: PhiDichVu.sort((a, b) => {
                        return (a.DonGiaPDV < b.DonGiaPDV);
                    }),
                    loading: false,
                    PhiDichVu: PhiDichVu.sort((a, b) => {
                        return (a.DonViTinhPDV < b.DonViTinhPDV);
                    }),
                    loading: false,
                });
            });
        });
    }
    onPressAdd = () => {
        if (this.state.textTenPhiDV.trim() === '' || 
            this.state.textDonGiaPhiDV.trim() === '' ||
            this.state.textDVTPhiDV.trim() === '' )
             {
            alert('Vui lòng nhập đầy đủ thông tin !');
            return;
        }
        else{
            alert('Thông tin đã được lưu !')
        }
        PhiDVRef.push({
            PhiDichVu: this.state.textTenPhiDV,
            DonGia: this.state.textDonGiaPhiDV,
            DonViTinh: this.state.textDVTPhiDV,
        });
    }

    _renderItem = ({item}) => {

        return(
            <View style={{padding: 10}}>
                
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Tên phí dịch vụ :{item.PhiDichVu} </Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn giá :{item.DonGia}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}>- Đơn vị tính :{item.DonViTinh}</Text>
                <Text style={{fontSize: 15,fontStyle: 'italic'}}> </Text>
            </View>


        );

    }

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
                        <TouchableOpacity onPress={this.onPressAdd}>
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
                                onChangeText={(text) => {this.setState({ textTenPhiDV: text });
                                    }
                                }
                                 value={this.state.textTenPhiDV}
                            />
                            <TextInput
                                placeholder='Đơn giá'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDonGiaPhiDV: text });
                                    }
                                }
                                 value={this.state.textDonGiaPhiDV}
                            />
                            <TextInput
                                placeholder='Đơn vị tính'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDVTPhiDV: text });
                                    }
                                }
                                 value={this.state.textDVTPhiDV}
                            />
                            </View> 
                            </Animated.View>         
                        </View>
                    </ScrollView>
                </View>

                    <FlatList
                        style={{borderColor: '#5aaf76',borderWidth: 4,height:100,marginTop: 10,fontSize: 10}}
                        data={this.state.PhiDichVu}
                        renderItem={this._renderItem}
                        >
                    </FlatList>    
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