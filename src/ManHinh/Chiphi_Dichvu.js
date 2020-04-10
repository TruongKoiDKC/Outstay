import React, { Component } from 'react'
import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    YellowBox
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
const Chiphi_DichvuRef = rootRef.child('Phí dịch vụ');

export default class Chiphi_Dichvu extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            PhiDichVu: 'Phí dịch vụ',
            textTenPhiDV: '',
            textDonGia: '',
            textDVT: '',
            loading: false,
        });
    }
    UNSAFE_componentDidMount() {
        Chiphi_DichvuRef.on('value', (childSnapshot) => {
            const phidichvus = [];
            childSnapshot.forEach((doc) => {
                phidichvus.push({
                    key: doc.key,
                    phidichvuName: doc.toJSON().phidichvuName
                });
                this.setState({
                    phidichvus: phidichvus.sort((a, b) => {
                        return (a.phidichvuName < b.phidichvuName);
                    }),
                    loading: false,
                });
            });
        });
    }
    onPressAdd = () => {
        if (this.state.textTenPhiDV.trim() === '' && 
        this.state.textDonGia.trim() === '' && 
        this.state.textDVT.trim() === '') {
            alert('Ban chưa nhập thông tin !!!');
            return;
        }
        Chiphi_DichvuRef.push({
            PhiDichVu: this.state.textTenPhiDV,
            DonGia: this.state.textDonGia,
            DonViTinh: this.state.textDVT,
        });
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
                                onChangeText={(text) => {this.setState({ textDonGia: text });
                                    }
                                }
                                 value={this.state.textDonGia}
                            />
                            <TextInput
                                placeholder='Đơn vị tính'
                                underlineColorAndroid='#5aaf76'
                                style={{fontSize:15}}
                                onChangeText={(text) => {this.setState({ textDVT: text });
                                    }
                                }
                                 value={this.state.textDVT}
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