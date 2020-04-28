import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";

//import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { ScrollView } from "react-native-gesture-handler";
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import * as firebaseApp from "firebase";
import { Platform } from "react-native";
import _ from 'lodash';


export default class DichVu extends React.Component {
  //Mở Modal box
  openModalPhiDV = () => {
    this.setState({modalPhiDV: true});
  };
  openModalLoaiPhong = () => {
    this.setState({modalLoaiPhong: true});
  };

  constructor(props) {
    super(props);
    if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp({
        apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
        //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
        databaseURL: 'https://fir-outstay.firebaseio.com',
        storageBucket: 'fir-outstay.appspot.com',
      });
    }
    this.DichVuRef = firebaseApp.database().ref("/Phí dịch vụ");
    this.LoaiPhongRef = firebaseApp.database().ref("/Loại phòng");
    
    const dataDichVu = [];
    const dataLoaiPhong = [];
    this.state = {
      dataDichVu:dataDichVu,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      dataLoaiPhong:dataLoaiPhong,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      ////Khai báo Modal box
      modalPhiDV: false,
      modalLoaiPhong: false,
    };
  }

  //Component của Loại Phòng vs Phí dịch vụ ..UNSAFE_ ko hoạt động qua Flatlist
  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.DichVuRef , this.LoaiPhongRef);
  }
  //Dịch Vụ và Loại phòng 
  listenForTasks(DichVuRef , LoaiPhongRef) {
    DichVuRef.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          PhiDichVu: child.val().PhiDichVu,
          DonGia: child.val().DonGia,
          DonViTinh: child.val().DonViTinh,
          key: child.key
        });
      });

      this.setState({
        dataDichVu: tasks
      });
      
    });
    LoaiPhongRef.on("value", dataSnapshot => {
      var tasks = [];
      dataSnapshot.forEach(child => {
        tasks.push({
          LoaiPhong: child.val().LoaiPhong,
          DienTich: child.val().DienTich,
          DonGia: child.val().DonGia,
          DonViTinh: child.val().DonViTinh,
          key: child.key
        });
      });

      this.setState({
        dataLoaiPhong: tasks
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 2,
          backgroundColor: "#BBB5B3"
        }}
      >
        <View />
      </View>
    );
  };

  //Xoá Item
  deleteItem(item) {
    this.setState({ deleteItem: item, confirmVisible: true });
  }

  performDeleteItem(key) {
    var updates = {};
    updates["/Phí dịch vụ/" + key] = null;
    updates["/Loại phòng/" + key] = null;
    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  //Thêm Items
  addItemPDV(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child("Phí dịch vụ")
      .push().key;

    var updates = {};
    updates["/Phí dịch vụ/" + newPostKey] = {
      PhiDichVu:
          itemName === "" || itemName == undefined
            ? this.state.itemPhiDichVu
            : itemName  ,
      DonGia:
          itemName === "" || itemName == undefined
            ? this.state.itemDonGiaDV
            : itemName  ,
      DonViTinh:
          itemName === "" || itemName == undefined
            ? this.state.itemDonViTinhDV
            : itemName  ,
    };
    return firebaseApp
      .database()
      .ref()
      .update(updates);
  }

  addItemLP(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child("Loại phòng")
      .push().key;

    var updates = {};
    updates["/Loại phòng/" + newPostKey] = {
      LoaiPhong:
        itemName === "" || itemName == undefined
          ? this.state.itemLoaiPhong
          : itemName  ,
      DienTich:
          itemName === "" || itemName == undefined
            ? this.state.itemDienTich
            : itemName  ,
      DonGia:
        itemName === "" || itemName == undefined
          ? this.state.itemDonGiaLP
          : itemName  ,
      DonViTinh:
          itemName === "" || itemName == undefined
            ? this.state.itemDonViTinhLP
            : itemName  ,
    };
    return firebaseApp
      .database()
      .ref()
      .update(updates);    
  }

  //Sửa Update lại Items
  updateItemPDV() {
    
    var updates = {};
    updates["/Phí dịch vụ/" + this.state.selecteditem.key] = {
      PhiDichVu: this.state.itemPhiDichVu,
      DonGia: this.state.itemDonGiaDV,
      DonViTinh: this.state.itemDonViTinhDV,
    };
    return firebaseApp
      .database()
      .ref()
      .update(updates);  
  }

  updateItemLP() {
    var updates = {};
    updates["/Loại phòng/" + this.state.selecteditem.key] = {
      LoaiPhong: this.state.itemLoaiPhong,
      DienTich: this.state.itemDienTich,
      DonGia: this.state.itemDonGiaLP,
      DonViTinh: this.state.itemDonViTinhLP,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  // Lưu các item của PDV và LP
  saveItemPDV() {
    if (this.state.selecteditem === null) this.addItemPDV();
    else this.updateItemPDV();

    this.setState({ itemPhiDichVu: "", selecteditem: null });
    this.setState({ itemDonGiaDV: "", selecteditem: null });
    this.setState({ itemDonViTinhDV: "", selecteditem: null });
  }
  saveItemLP() {
      if (this.state.selecteditem === null) this.addItemLP();
      else this.updateItemLP();
    this.setState({ itemLoaiPhong: "", selecteditem: null });
    this.setState({ itemDienTich: "", selecteditem: null });
    this.setState({ itemDonGiaLP: "", selecteditem: null });
    this.setState({ itemDonViTinhLP: "", selecteditem: null });
  }
  
  //Ẩn Dialog thông báo
  hideDialog(yesNo) {
    this.setState({ confirmVisible: false });
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({ snackbarVisible: true });
      });
    }
  }
  //Hiện Dialog thông báo
  showDialog() {
    this.setState({ confirmVisible: true });
    console.log("in show dialog");
  }

  //Hoàn tác lại những gì đã xoá
  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }


  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.openModalPhiDV}>
              <Icon name="dollar" type="FontAwesome" style={{fontSize: 25}} />
            </TouchableOpacity>
            <Modal
              isVisible={this.state.modalPhiDV}
              onBackdropPress={() => this.setState({modalPhiDV: false})}>
              <View
                style={{
                  width: 350,
                  height: 300,
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  shadowRadius: 20,
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 21,
                      fontWeight: 'bold',
                    }}>
                    Chi phí dịch vụ
                  </Text>
                </View>
                <View>
                  <Animated.View style={styles.vienkhung}>
                    <View style={{padding: 8}}>
                      <TextInput
                        placeholder="Tên phí dịch vụ"
                        underlineColorAndroid="#5aaf76"
                        style={{fontSize: 15}}
                        onChangeText={text => this.setState({ itemPhiDichVu: text })}
                        value={this.state.itemPhiDichVu}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Đơn giá"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text => this.setState({ itemDonGiaDV: text })}
                            value={this.state.itemDonGiaDV}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Đơn vị tính"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text => this.setState({ itemDonViTinhDV: text })}
                            value={this.state.itemDonViTinhDV}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.saveItemPDV()}
                      style={[styles.btn, {backgroundColor: '#5aaf76'}]}
                    >
                      {this.state.selecteditem === null ?  "Thêm" : "Cập Nhật"}
                    </Button>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 3}}>
            <Text style={{color: 'black', fontSize: 21, fontWeight: 'bold'}}>
              Dịch vụ
            </Text>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.openModalLoaiPhong}>
              <Icon
                name="building-o"
                type="FontAwesome"
                style={{fontSize: 25, marginLeft: '70%'}}
              />
            </TouchableOpacity>
            <Modal
              isVisible={this.state.modalLoaiPhong}
              onBackdropPress={() => this.setState({modalLoaiPhong: false})}>
              <View
                style={{
                  width: 350,
                  height: 350,
                  position: 'relative',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  shadowRadius: 20,
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 21,
                      fontWeight: 'bold',
                    }}>
                    Loại phòng
                  </Text>
                </View>
                <View>
                  <Animated.View style={styles.vienkhung}>
                    <View style={{padding: 8}}>
                      <TextInput
                        placeholder="Tên loại phòng"
                        underlineColorAndroid="#5aaf76"
                        style={{fontSize: 15}}
                        onChangeText={text => this.setState({ itemLoaiPhong: text })}
                        value={this.state.itemLoaiPhong}
                      />
                      <TextInput
                        placeholder="Diện tích"
                        underlineColorAndroid="#5aaf76"
                        style={{fontSize: 15}}
                        onChangeText={text => this.setState({ itemDienTich: text })}
                        value={this.state.itemDienTich}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Đơn giá"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text => this.setState({ itemDonGiaLP: text })}
                            value={this.state.itemDonGiaLP}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <TextInput
                            placeholder="Đơn vị tính"
                            underlineColorAndroid="#5aaf76"
                            style={{fontSize: 15}}
                            onChangeText={text => this.setState({ itemDonViTinhLP: text })}
                            value={this.state.itemDonViTinhLP}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.saveItemLP()}
                      style={[styles.btn, {backgroundColor: '#5aaf76'}]}
                    >
                      {this.state.selecteditem === null ?  "Thêm" : "Cập Nhật"}
                  </Button>
                </View>
                <View />
              </View>
            </Modal>
          </View>
        </View>
        <View>
      </View>
      
      <Text style={{fontSize: 20 , fontStyle: 'italic', marginTop: 20}}> Phí Dịch Vụ : </Text>  
        <PaperProvider>
            <ScrollView>
              <FlatList
                data={this.state.dataDichVu}
                style={styles.vienkhung}
                renderItem={({ item }) => (
                  <View>
                    <ScrollView horizontal={true}>
                      <TouchableWithoutFeedback>
                        <View style={{ paddingTop: 10 }}>
                          <Text
                            style={{ color: "#5aaf76" ,marginLeft: 20}}
                            onPress={() => this.deleteItem(item)}
                          >
                            <Ionicons name="md-trash" size={20} />
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.setState({
                            selecteditem: item,
                            itemPhiDichVu: item.PhiDichVu,
                            itemDonGiaDV: item.DonGia,
                            itemDonViTinhDV: item.DonViTinh,
                          })
                        }
                      >
                        <View>
                          <Text style={styles.item}>- Phí dịch vụ : {item.PhiDichVu} </Text>
                          <Text style={styles.item}>- Đơn giá : {item.DonGia} </Text>
                          <Text style={styles.item}>- Đơn vị tính : {item.DonViTinh} </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <Text />

              
              <Portal>
                <Dialog
                  visible={this.state.confirmVisible}
                  onDismiss={() => this.hideDialog(false)}
                >
                  <Dialog.Title>Xác nhận</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph style={{fontSize: 15}}>Bạn thật sự muốn xoá ?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(true)}>Có</Button>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(false)}>Không</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </ScrollView>
            <Snackbar
              visible={this.state.snackbarVisible}
              onDismiss={() => this.setState({ snackbarVisible: false })}
              action={{
                label: "Hoàn tác",
                onPress: () => {
                  // Do something
                  this.undoDeleteItem();
                }
              }}
            >
              Xoá thông tin thành công .
            </Snackbar>
          </PaperProvider>

        <Text style={{fontSize: 20 , fontStyle: 'italic', marginTop: 40}}> Loại Phòng : </Text>  
          <PaperProvider>
            <ScrollView>
              <FlatList
                data={this.state.dataLoaiPhong}
                style={styles.vienkhung}
                renderItem={({ item }) => (
                  <View>
                    <ScrollView horizontal={true}>
                      <TouchableWithoutFeedback>
                        <View style={{ paddingTop: 10 }}>
                          <Text
                            style={{ color: "#5aaf76",marginLeft: 20}}
                            onPress={() => this.deleteItem(item)}
                          >
                            <Ionicons name="md-trash" size={20} />
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          this.setState({
                            selecteditem: item,
                            itemLoaiPhong: item.LoaiPhong,
                            itemDienTich: item.DienTich,
                            itemDonGiaLP: item.DonGia,
                            itemDonViTinhLP: item.DonViTinh
                          })
                        }
                      >
                        <View>
                          <Text style={styles.item}>- Loại phòng : {item.LoaiPhong} </Text>
                          <Text style={styles.item}>- Diện tích : {item.DienTich} </Text>
                          <Text style={styles.item}>- Đơn giá : {item.DonGia} </Text>
                          <Text style={styles.item}>- Đơn vị tính : {item.DonViTinh} </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </ScrollView>
                  </View>
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
              <Text />

              
              <Portal>
                <Dialog
                  visible={this.state.confirmVisible}
                  onDismiss={() => this.hideDialog(false)}
                >
                  <Dialog.Title>Xác nhận</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph style={{fontSize: 15}}>Bạn thật sự muốn xoá ?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(true)}>Có</Button>
                    <Button color="#5aaf76" onPress={() => this.hideDialog(false)}>Không</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </ScrollView>
            <Snackbar
              visible={this.state.snackbarVisible}
              onDismiss={() => this.setState({ snackbarVisible: false })}
              action={{
                label: "Hoàn tác",
                onPress: () => {
                  // Do something
                  this.undoDeleteItem();
                }
              }}
            >
              Xoá thông tin thành công .
            </Snackbar>
          </PaperProvider>
          
        
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
    backgroundColor: 'white',
    padding: '5%',
  },
  item: {
    marginLeft: 5,
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  },

  vienkhung: {
    paddingVertical: 10,
    borderColor: '#5aaf76',
    borderWidth: 3,
    margin: '3%',
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
});
