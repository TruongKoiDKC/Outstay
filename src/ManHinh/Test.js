import React, { Component } from 'react';
import { AppRegistry, 
        TouchableOpacity, 
        Animated,
        StyleSheet, View, Text, 
        FlatList,
        TouchableWithoutFeedback,
        ScrollView,
        TextInput,
       } from 'react-native';
import { Button,} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SearchBar, ListItem} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Modal from 'react-native-modal';
//import Animated from 'react-native-reanimated';
import * as firebaseApp from "firebase";
import {Platform} from 'react-native';


export default class PhongTro extends Component {

  constructor() {
    super();
    if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp({
        apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
        //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
        databaseURL: 'https://fir-outstay.firebaseio.com',
        storageBucket: 'fir-outstay.appspot.com',
      });
    }
    this.tasksRef = firebaseApp.database().ref('/Phòng trọ');
    this.DichVuRef = firebaseApp.database().ref('/Phí dịch vụ');
    this.LoaiPhongRef = firebaseApp.database().ref('/Loại phòng');

    const dataSource = [];

    //this.state = { valueArray: [], disabled: false }
    this.index = 0;
    this.animatedValue = new Animated.Value(0);

    this.state = {
      dataSource: dataSource,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      ////Khai báo Modal box
      modal: false,

      //Search
      search: '',

      valueArray: [], disabled: false 
    };
  }
   //Menu chọn Khách hàng và Hợp đồng
   menu = null;
   setMenuRef = ref => {
     this.menu = ref;
   };
   showMenu = () => {
     this.menu.show();
   };
 
   //Mở Modal box
   openModal = () => {
     this.setState({modal: true});
   };
 
   componentDidMount() {
     // start listening for firebase updates
     this.listenForTasks(this.tasksRef, this.DichVuRef, this.LoaiPhongRef);
   }
 
   listenForTasks(tasksRef, DichVuRef, LoaiPhongRef) {
     tasksRef.on('value', dataSnapshot => {
       var tasks = [];
       dataSnapshot.forEach(child => {
         tasks.push({
           TrangThaiPhong: child.val().TrangThaiPhong,
           TenPhong: child.val().TenPhong,
           LoaiPhong: child.val().LoaiPhong,
           TienPhong: child.val().TienPhong,
           SDTcu: child.val().SDTcu,
           SDThientai: child.val().SDThientai,
           SoNuocCu: child.val().SoNuocCu,
           SoNuocHienTai: child.val().SoNuocHienTai,
           PhiDichVu: child.val().PhiDichVu,
           key: child.key,
         });
       });
 
       this.setState({
         dataSource: tasks,
       });
     });
   }
 
   renderSeparator = () => {
     return (
       <View
         style={{
           width: '90%',
           height: 2,
           backgroundColor: '#BBB5B3',
         }}>
         <View />
       </View>
     );
   };
   addItem(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child('Phòng trọ')
      .push().key;

    var updates = {};
    updates['/Phòng trọ/' + newPostKey] = {
      TrangThaiPhong:
        itemName === '' || itemName == undefined
          ? this.state.itemTrangThaiPhong
          : itemName,
      TenPhong:
        itemName === '' || itemName == undefined
          ? this.state.itemTenPhong
          : itemName,
      TienPhong:
        itemName === '' || itemName == undefined
          ? this.state.itemTienPhong
          : itemName,
      SDTcu:
        itemName === '' || itemName == undefined
          ? this.state.itemSDTcu
          : itemName,
      SDThientai:
        itemName === '' || itemName == undefined
          ? this.state.itemSDThientai
          : itemName,
      SoNuocCu:
        itemName === '' || itemName == undefined
          ? this.state.itemSoNuocCu
          : itemName,
      SoNuocHienTai:
        itemName === '' || itemName == undefined
          ? this.state.itemSoNuocHienTai
          : itemName,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  updateItem() {
    var updates = {};
    updates['/Phòng trọ/' + this.state.selecteditem.key] = {
      TrangThaiPhong: this.state.itemTrangThaiPhong,
      TenPhong: this.state.itemTenPhong,
      TienPhong: this.state.itemTienPhong,
      SDTcu: this.state.itemSDTcu,
      SDThientai: this.state.itemSDThientai,
      SoNuocCu: this.state.itemSoNuocCu,
      SoNuocHienTai: this.state.itemSoNuocHienTai,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();

    this.setState({itemTrangThaiPhong: '', selecteditem: null});
    this.setState({itemTenPhong: '', selecteditem: null});
    this.setState({itemTienPhong: '', selecteditem: null});
    this.setState({itemSDTcu: '', selecteditem: null});
    this.setState({itemSDThientai: '', selecteditem: null});
    this.setState({itemSoNuocCu: '', selecteditem: null});
    this.setState({itemSoNuocHienTai: '', selecteditem: null});
  }

  hideDialog(yesNo) {
    this.setState({confirmVisible: false});
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({snackbarVisible: true});
      });
    }
  }

  showDialog() {
    this.setState({confirmVisible: true});
    console.log('in show dialog');
  }

  updateSearch = text => {
    this.setState({
      search: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.itemTrangThaiPhong.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData});
  };

  addMore = () => {
    this.animatedValue.setValue(0);
    let newlyAddedValue = { index: this.index }
    this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }
      ).start(() => {
        this.index = this.index + 1;
        this.setState({ disabled: false });
      });
    });
  }


  render() {
    const animationValue = this.animatedValue.interpolate(
      {
        inputRange: [0, 1],
        outputRange: [-59, 0]
      });

    let newArray = this.state.valueArray.map((item, key) => {
      if ((key) == this.index) {
        return (
          <Animated.View key={key} style={[styles.viewHolder, { opacity: this.animatedValue, transform: [{ translateY: animationValue }] }]}>
            <Text style={styles.headerText}>P {item.index}</Text>
          </Animated.View>
        );
      }
      else {
        return (
          <TouchableOpacity onPress={() => {this.Dangnhap()}}>
            <View key={key} style={styles.viewHolder}>
                <Text style={styles.headerText}>Phòng số : {item.index}</Text> 
              
            </View>
          </TouchableOpacity>
        );
      }
    });

    return (
      <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={this.openModal}>
                <Icon name="plus" type="FontAwesome5" style={{fontSize: 25}} />
              </TouchableOpacity>

              <Modal
                isVisible={this.state.modal}
                onBackdropPress={() => this.setState({modal: false})}>
                <View
                  style={{
                    width: 350,
                    height: 590,
                    position: 'relative',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    shadowRadius: 20,
                    justifyContent:'center'
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 21,
                        fontWeight: 'bold',
                      }}>
                      Chi tiết phòng trọ
                    </Text>
                  </View>
                  <View>
                    <Animated.View style={styles.vienkhung}>
                      <View style={{padding: 8}}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          Trạng thái phòng
                        </Text>
                        <TextInput
                          placeholder="Phòng trống / Đã cọc / Đang ở"
                          underlineColorAndroid="#5aaf76"
                          style={[{fontSize: 15}]}
                          onChangeText={text => this.setState({ itemTrangThaiPhong: text })}
                          value={this.state.itemTrangThaiPhong}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: 'bold',
                            marginTop: 20,
                          }}>
                          Thông tin phòng
                        </Text>
                        <TextInput
                          placeholder="Tên phòng"
                          underlineColorAndroid="#5aaf76"
                          style={[{fontSize: 15}]}
                          onChangeText={text => this.setState({ itemTenPhong: text })}
                          value={this.state.itemTenPhong}
                        />
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Loại phòng"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemLoaiPhong: text })}
                              value={this.state.itemLoaiPhong}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Tiền phòng"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemTienPhong: text })}
                              value={this.state.itemTienPhong}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Số điện cũ"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemSDTcu: text })}
                              value={this.state.itemSDTcu}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Số điện hiện tại"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemSDThientai: text })}
                              value={this.state.itemSDThientai}
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Số nước cũ"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemSoNuocCu: text })}
                              value={this.state.itemSoNuocCu}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextInput
                              placeholder="Số nước hiện tại"
                              underlineColorAndroid="#5aaf76"
                              style={{fontSize: 15}}
                              onChangeText={text => this.setState({ itemSoNuocHienTai: text })}
                              value={this.state.itemSoNuocHienTai}
                            />
                          </View>
                        </View>
                        <TextInput
                          placeholder="Phí dịch vụ"
                          underlineColorAndroid="#5aaf76"
                          style={{fontSize: 15}}
                          onChangeText={text => this.setState({ itemPhiDichVu: text })}
                          value={this.state.itemPhiDichVu}
                        />
                      </View>
                    </Animated.View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                   <Button 
                      mode="contained"
                      onPress={() => this.saveItem()}
                      style={[styles.btn, {backgroundColor: '#5aaf76'}]}
                    >
                      {this.state.selecteditem === null ?  "Thêm" : "Cập Nhật"}
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>

            <View
              style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
                Phòng trọ
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Menu
                style={{width: 150, height: 100}}
                ref={this.setMenuRef}
                button={
                  <Text style={{marginLeft: '80%'}} onPress={this.showMenu}>
                    <Icon
                      name="ellipsis-v"
                      type="FontAwesome5"
                      style={{fontSize: 25}}
                    />
                  </Text>
                }>
                <MenuItem
                  onPress={() =>
                    this.props.navigation.navigate('ManHinhKhachHang')
                  }>
                  Khách thuê
                </MenuItem>
                <MenuItem
                  onPress={() =>
                    this.props.navigation.navigate('ManHinhHopDong')
                  }>
                  Hợp đồng
                </MenuItem>
                <MenuItem onPress={this.hideMenu} disabled>
                  {' '}
                </MenuItem>
              </Menu>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <SearchBar
              placeholder="Tìm kiếm ..."
              platform="android"
              underlineColorAndroid="#5aaf76"
              onChangeText={text => this.updateSearch(text)}
              autoCorrect={false}
              value={this.state.search}
            />
          </View>

          <View>
        <ScrollView>
          <View style={{ flex: 1, padding: 4 }}>
            {
              newArray
            }
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} disabled={this.state.disabled} onPress={this.addMore}>
        <Feather name="plus" size={40} />
        </TouchableOpacity>
      </View>

        </View>
    );
  }
}

      


const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 38 : 22,
      backgroundColor: 'white',
      padding: '5%',
    },
  
    vienkhung: {
      paddingVertical: 10,
      borderColor: '#5aaf76',
      borderWidth: 4,
      margin: '5%',
      borderRadius: 20,
    },
    btn: {
      borderColor: '#5aaf76',
      borderWidth: 4,
      padding: 15,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 120,
    },
    viewHolder: {
      height: 55,
      backgroundColor: '#5aaf76',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 4
    },
    headerText: {
      color: 'white',
      fontSize: 25
    },
    buttonDesign: {
      position: 'absolute',
      right: 25,
      bottom: 25,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
