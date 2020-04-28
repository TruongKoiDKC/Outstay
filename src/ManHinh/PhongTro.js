import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as firebaseApp from "firebase";
import {
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar, ListItem} from 'react-native-elements';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { Platform } from "react-native";



export default class App extends React.Component {
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
    this.tasksRef = firebaseApp.database().ref("/Phòng trọ");
    
    const dataSource = [];
    this.state = {
      dataSource: dataSource,
      selecteditem: null,
      snackbarVisible: false,
      confirmVisible: false,

      ////Khai báo Modal box
      modal: false,

      //Search
      search:'',
    };this.arrayholder = [];
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
    this.listenForTasks(this.tasksRef);
  }

  listenForTasks(tasksRef) {
    tasksRef.on("value", dataSnapshot => {
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
          key: child.key
        });
      });

      this.setState({
        dataSource: tasks
      });
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          width: "90%",
          height: 2,
          backgroundColor: "#BBB5B3"
        }}
      >
        <View />
      </View>
    );
  };
  deleteItem(item) {
    this.setState({ deleteItem: item, confirmVisible: true });
  }

  performDeleteItem(key) {
    var updates = {};
    updates["/Phòng trọ/" + key] = null;
    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  addItem(itemName) {
    var newPostKey = firebaseApp
      .database()
      .ref()
      .child("Phòng trọ")
      .push().key;

   
    var updates = {};
    updates["/Phòng trọ/" + newPostKey] = {
      TrangThaiPhong:
        itemName === "" || itemName == undefined
          ? this.state.itemTrangThaiPhong
          : itemName  ,
      TenPhong:
          itemName === "" || itemName == undefined
            ? this.state.itemTenPhong
            : itemName  ,
      LoaiPhong:
        itemName === "" || itemName == undefined
          ? this.state.itemLoaiPhong
          : itemName  ,
      TienPhong:
          itemName === "" || itemName == undefined
            ? this.state.itemTienPhong
            : itemName  ,
      SDTcu:
          itemName === "" || itemName == undefined
            ? this.state.itemSDTcu
            : itemName  ,
      SDThientai:
        itemName === "" || itemName == undefined
          ? this.state.itemSDThientai
          : itemName  ,
      SoNuocCu:
          itemName === "" || itemName == undefined
            ? this.state.itemSoNuocCu
            : itemName  ,
      SoNuocHienTai:
          itemName === "" || itemName == undefined
            ? this.state.itemSoNuocHienTai
            : itemName  ,
      PhiDichVu:
          itemName === "" || itemName == undefined
            ? this.state.itemPhiDichVu
            : itemName  ,
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);    
  }

  updateItem() {
    
    var updates = {};
    updates["/Phòng trọ/" + this.state.selecteditem.key] = {
      TrangThaiPhong: this.state.itemTrangThaiPhong,
      TenPhong: this.state.itemTenPhong,
      LoaiPhong: this.state.itemLoaiPhong,
      TienPhong: this.state.itemTienPhong,
      SDTcu: this.state.itemSDTcu,
      SDThientai: this.state.itemSDThientai,
      SoNuocCu: this.state.itemSoNuocCu,
      SoNuocHienTai: this.state.itemSoNuocHienTai,
      PhiDichVu: this.state.itemPhiDichVu
    };

    return firebaseApp
      .database()
      .ref()
      .update(updates);   
  }

  saveItem() {
    if (this.state.selecteditem === null) this.addItem();
    else this.updateItem();

    this.setState({ itemTrangThaiPhong: "", selecteditem: null });
    this.setState({ itemTenPhong: "", selecteditem: null });
    this.setState({ itemLoaiPhong: "", selecteditem: null });
    this.setState({ itemTienPhong: "", selecteditem: null });
    this.setState({ itemSDTcu: "", selecteditem: null });
    this.setState({ itemSDThientai: "", selecteditem: null });
    this.setState({ itemSoNuocCu: "", selecteditem: null });
    this.setState({ itemSoNuocHienTai: "", selecteditem: null });
    this.setState({ itemPhiDichVu: "", selecteditem: null });
  }

  hideDialog(yesNo) {
    this.setState({ confirmVisible: false });
    if (yesNo === true) {
      this.performDeleteItem(this.state.deleteItem.key).then(() => {
        this.setState({ snackbarVisible: true });
      });
    }
  }

  showDialog() {
    this.setState({ confirmVisible: true });
    console.log("in show dialog");
  }

  undoDeleteItem() {
    this.addItem(this.state.deleteItem.name);
  }
  
  updateSearch = text  => {
    this.setState({
      search: text,
    })   
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.itemTrangThaiPhong.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ dataSource: newData });  
  };

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

          <PaperProvider>
            <ScrollView>
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) => (
                  <View>
                    <ScrollView horizontal={true}>
                      <TouchableWithoutFeedback>
                        <View style={{ paddingTop: 10 }}>
                          <Text
                            style={{ color: "#5aaf76" }}
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
                            itemTrangThaiPhong: item.TrangThaiPhong,
                            itemTenPhong: item.TenPhong,
                            itemLoaiPhong: item.LoaiPhong,
                            itemTienPhong: item.TienPhong,
                            itemSDTcu: item.SDTcu,
                            itemSDThientai: item.SDThientai,
                            itemSoNuocCu: item.SoNuocCu,
                            itemSoNuocHienTai: item.SoNuocHienTai,
                            itemPhiDichVu: item.PhiDichVu,
                          })
                        }
                      >
                        <View>
                          <Text style={styles.item}>- Trạng thái phòng : {item.TrangThaiPhong} </Text>
                          <Text style={styles.item}>- Tên phòng : {item.TenPhong} </Text>
                          <Text style={styles.item}>- Loại phòng : {item.LoaiPhong} </Text>
                          <Text style={styles.item}>- Tiền phòng : {item.TienPhong} </Text>
                          <Text style={styles.item}>- Số ĐT cũ : {item.SDTcu} </Text>
                          <Text style={styles.item}>- Số ĐT hiện tại : {item.SDThientai} </Text>
                          <Text style={styles.item}>- Số nước cũ :  {item.SoNuocCu} </Text>
                          <Text style={styles.item}>- Số nước mới : {item.SoNuocHienTai} </Text>
                          <Text style={styles.item}>- Phí dịch vụ : {item.PhiDichVu} </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  },
});