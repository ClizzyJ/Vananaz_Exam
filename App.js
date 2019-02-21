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
  disabledSubmitButton: {
    backgroundColor: '#e5e5e5',
    padding: 5,
    marginLeft: 25,
    marginRight: 25,
    height: 40,
    borderRadius: 5
  },
  disabledSubmitButtonText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 20
  },
  submitButtonText: {
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
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: '',
        password: '',
      },
      errors: {
        email: 'start',
        password: 'start'
      },
      isEnabled: false,
      touched: {
        email: false,
        password: false
      }
    };
  }
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    //console.log(fields)
      //password
      if(typeof fields["password"] !== 'undefined'){
        if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "Cannot be empty";
        }else if(fields["password"].length < 6){
          formIsValid = false;
          errors["password"] = "please use at least 6 - 12 characters"
        }
      }
      //Email
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }else if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
 
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
           formIsValid = false;
           errors["email"] = "not correct format for email address";
         }
      } 
    this.setState({errors: errors});
    return formIsValid;
  }
  // onEndValidation(field){
  //   let result = this.handleValidation(field);
  //   this.setState(
  //     {
  //      isEnabled: result
  //     }
  //   )
  // }
  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.handleValidation();
  };
  render() {
    var isDisabled = true;
    
    const shouldMarkError = field => {
      const hasError = this.state.errors[field];
      const shouldShow = this.state.touched[field];
   
      isDisabled = hasError? true : false;
      console.log(hasError)
      //console.log(shouldShow)
      // console.log(isDisabled);
      return hasError ? shouldShow : false;
    };
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
                refs = "email"
                placeholder = "input email address"
                placeholderTextColor = "#9a73ef"
                underlineColorAndroid = 'transparent'
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {
                  (text) => this.setState({
                    fields: {...this.state.fields,["email"]: text
                    }
                  })
                }
                value ={this.state.fields["email"]}
                //onEndEditing = {this.onEndValidation.bind(this,"email")}
                onBlur={this.handleBlur('email')}
        />
        <Text style={styles.errorText}>{ shouldMarkError("email") ? this.state.errors["email"] : ' '}</Text>

        <Text style={styles.upperPlaceholder}>Password</Text>
        <TextInput style = {styles.input}
                refs = "password"
                secureTextEntry={true}
                placeholder = "input password"
                placeholderTextColor = "#9a73ef"
                underlineColorAndroid = 'transparent'
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {
                  (text) => this.setState({
                    fields: {...this.state.fields,["password"]:text
                    }
                  })
                }
                value = {this.state.fields["password"]}
                //onEndEditing = {this.onEndValidation.bind(this,"password")}
                onBlur={this.handleBlur('password')}
        />
        <Text style={styles.errorText}>{shouldMarkError("password") ? this.state.errors["password"] : ' '}</Text>  
        
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
        {/* <button 
          disabled={!isEnabled}
          title = "Sign in"
        />   */}
        <TouchableOpacity
            disabled ={isDisabled}
            style = {isDisabled ? styles.disabledSubmitButton : styles.submitButton}
            onPress = {
              () => this.login(this.state.email, this.state.password)
            }>
            <Text style ={isDisabled ? styles.disabledSubmitButtonText :styles.submitButtonText} >Sign In</Text>
            
        </TouchableOpacity> 
      </View>
      
      </View>
    );
  }
}