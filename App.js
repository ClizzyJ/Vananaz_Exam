import React, { Component } from 'react';
import { Text, View , StyleSheet, AppRegistry, Image, TextInput,TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  lowerbg: {
    position: 'absolute',
    bottom: 0
  },
  logoView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  }, 
  input: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 5,
    marginBottom: 2,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize:20,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 5,
    marginLeft: 25,
    marginRight: 25,
    height: 40,
  },
  submitButtonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  },
  container: {
    paddingTop: 40
  },
  upperPlaceholder: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 30
  },
  errorText: {
    marginLeft: 30,
    marginBottom: 2,
    color: 'red',
    fontSize: 18,
    fontStyle: 'italic'
  },
  checkBox: {
    fontSize: 200
  }
});

export default class Backgrounds extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignContent: 'stretch'
      }}>

      <View>
        <Image source={require('./assets/images/01-upper-bg.png')}/>
      </View>

      <View style={styles.logoView} >
        <Image style={styles.logo} source={require('./assets/images/Logo.png')}/>
      </View>
      
      <View style={styles.lowerbg}>
        <Image source={require('./assets/images/01-lower-bg.png')}/>
      </View>

      <View style={styles.container}>
        <Text style={styles.upperPlaceholder}>Email</Text>
        <TextInput style = {styles.input}
                placeholder = "input email address"
                placeholderTextColor = "#9a73ef"
                underlineColorAndroid = 'transparent'
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {this.handleEmail}/>
        <Text style={styles.errorText}>hehe</Text>
        <Text style={styles.upperPlaceholder}>Password</Text>
        <TextInput style = {styles.input}
                placeholder = "input password"
                placeholderTextColor = "#9a73ef"
                underlineColorAndroid = 'transparent'
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {this.handlePassword}/>
        <Text style={styles.errorText}>hehe</Text>  
        <CheckBox style={styles.checkBox}
          title= 'Remember me' 
          checkedColor= '#9a73ef'  
          containerStyle= {{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            marginLeft: 25,
            marginTop: -10
          }}  
          textStyle= {{
            fontSize: 18
          }}
        />    
        <TouchableOpacity
            style = {styles.submitButton}
            onPress = {
              () => this.login(this.state.email, this.state.password)
            }>
            <Text style = {styles.submitButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      
      </View>
    );
  }
}