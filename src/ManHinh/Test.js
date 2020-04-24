import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import * as firebaseApp from "firebase";
import {
  TextInput,
  Button,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  Provider as PaperProvider
} from "react-native-paper";

 /*
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyDYmW5KUcA4YK9RFX8rmozMCmtb1q2sL5Q',
    //authDomain: “FULL_AUTHDOMAIN_PUT_HERE”,
    databaseURL: 'https://fir-outstay.firebaseio.com',
    storageBucket: 'fir-outstay.appspot.com',
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack);
  }
}*/

import { Platform } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons'

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
      confirmVisible: false
    };
  }
    
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
  
  

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <ScrollView>
            <Text>City list from firebase</Text>
            <TextInput
              label="City"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemTrangThaiPhong: text })}
              value={this.state.itemTrangThaiPhong}
            />  
            <TextInput
              label="Haha"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemTenPhong: text })}
              value={this.state.itemTenPhong}
            />  
            <TextInput
              label="Haha"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemLoaiPhong: text })}
              value={this.state.itemLoaiPhong}
            />  
            <TextInput
              label="Haha"
              style={{
                height: 50,
                width: 250,
                borderColor: "gray",
                borderWidth: 1                
              }}
              onChangeText={text => this.setState({ itemTienPhong: text })}
              value={this.state.itemTienPhong}
            />  
            <View style={{height:10}}></View>          
            <Button 
              icon={this.state.selecteditem === null ? "add" : "update"}
              mode="contained"
              onPress={() => this.saveItem()}
            >
              {this.state.selecteditem === null ? "add" : "update"}
            </Button>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View>
                  <ScrollView horizontal={true}>
                    <TouchableWithoutFeedback>
                      <View style={{ paddingTop: 10 }}>
                        <Text
                          style={{ color: "#4B0082" }}
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
                          itemTienPhong: item.TienPhong
                        })
                      }
                    >
                      <View>
                        <Text style={styles.item}>{item.TrangThaiPhong} </Text>
                        <Text style={styles.item}>{item.TenPhong} </Text>
                        <Text style={styles.item}>{item.LoaiPhong} </Text>
                        <Text style={styles.item}>{item.TienPhong} </Text>
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
                <Dialog.Title>Confirm</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Are you sure you want to delete this?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => this.hideDialog(true)}>Yes</Button>
                  <Button onPress={() => this.hideDialog(false)}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
          <Snackbar
            visible={this.state.snackbarVisible}
            onDismiss={() => this.setState({ snackbarVisible: false })}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
                this.undoDeleteItem();
              }
            }}
          >
            Item deleted successfully.
          </Snackbar>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 38 : 22,
    alignItems: "center",
    backgroundColor: "#F5FFFA"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignItems: "center"
  }
});