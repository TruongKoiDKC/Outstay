import React from 'react';
import { StyleSheet,
         Text, 
         View,
         Image,
         TouchableOpacity } from 'react-native';

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: 'white' }];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
        <Image
            style={{width: 220, height: 220}}
            source={require('../images/header.png')}
            resizeMode= 'contain'
        ></Image>    
        <Text style={textStyles}>
          Splash Screen
        </Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }

    return (

    <View style={styles.header}> 
      <View style={styles.Image}>
       
        <Image
            style={{width: 220, height: 220}}
            source={require('../images/header.png')}
            resizeMode= 'contain'
        />
            <Text style={{fontWeight:"bold", fontSize: 20,marginTop: 40,color:"#CCCCCC"}}>
                        CHÀO MỪNG BẠN ĐẾN VỚI 
            </Text>
            <Text style={{fontStyle:'italic',fontWeight:"bold", fontSize: 30,color:"#93278f"}}>
                        OUTSTAY
            </Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("ManHinhLogin")}>
                <Text style={{fontWeight:"bold", fontSize: 25,color:"black",marginTop:280}}>
                        BẮT ĐẦU
                </Text>
            </TouchableOpacity>    
      </View>
    </View> 

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header:{
      flex: 1
  },

  Image:{
      justifyContent:'center',
      alignItems: 'center'

  }
});