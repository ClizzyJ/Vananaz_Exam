import React, { Component } from 'react';
import { Text, View , StyleSheet, AppRegistry, Image, TextInput, TouchableOpacity, AsyncStorage,FlatList} from 'react-native';
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
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize:20,
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
    marginTop: 2,
    marginLeft: 30,
    marginBottom: 2,
    color: 'red',
    fontSize: 18,
    fontStyle: 'italic'
  },
  checkBox: {
    fontSize: 200
  },
  suggestions: {
    marginLeft: 25,
    marginRight:25,
    padding: 0
  },
  suggestionItems : {
    fontSize: 18,
    fontStyle: 'italic',
    padding: 5,
    paddingLeft:10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#7a42f4',
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
      checked: false,
      touched: {
        email: false,
        password: false
      },
      suggestions:[] ,
      rememberMe: [] ,
      emails: [],
    };
  }
  //handles text changes for the email and suggestions
  onTextChange = (text) => {
    let suggestions = [];
    if(text.length > 0){
        const regex = new RegExp(`^${text}`,'i');
        suggestions = this.state.emails.sort().filter(v => regex.test(v))
    }
    this.setState(() => ({suggestions:suggestions , fields: {...this.state.fields,["email"]: text }}))
  }
  //handles the onpress on suggestions
  suggestionSelected(text){
    let password;
    let x;
    for (x = 0; x < this.state.rememberMe.length && text != this.state.rememberMe[x].email; x++){}
    password = this.state.rememberMe[x].password
    
    this.setState( () => ({errors: {},suggestions: [] ,fields: {...this.state.fields,["email"]: text,["password"]: password}}) )
  }
  //renders the suggestions below input
  renderSuggestions () {
    if (this.state.suggestions.length === 0){
      return null;
    }
    return (
      <FlatList 
        style = {styles.suggestions}
        data= {this.state.suggestions}
        renderItem={({item}) => <Text onPress={() => this.suggestionSelected(item)} style ={styles.suggestionItems}>{item}</Text>}    
        keyExtractor={(item, index) => index.toString()}      
      />
    )
  }
 //Log-in and if remember me is ticked, stores the details into AsyncStorage
  login(){
    if(this.state.checked){
      let acc = {
        email: this.state.fields['email'],
        password: this.state.fields['password']
      }
      let key =  Math.floor((Math.random() * 10) + 1) + 'key' +  Math.floor((Math.random() * 10) + 20);
        try {
          AsyncStorage.setItem(key, JSON.stringify(acc));
        } catch (error) {
          // Error saving data
          console.log(error)
        }
    }
    alert("Login Success!");
  }
  //handles the validation for email and password
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
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
  // Get list of user infos from AsynchStorage before everything is set for suggestions
  componentWillMount(){
    let data = []
    let emails = []
      try {
        AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys))
        .then((result) => {
          for (let x =0; x < result.length; x++){
            if (typeof JSON.parse(result[x][1]) !== 'undefined'){
              data[x] = JSON.parse(result[x][1]);
              emails[x] = data[x].email;
            }
          }
          this.setState({rememberMe:data, emails:emails})
        })
      } catch (error) {
        // Error retrieving data
        console.log(error)
      }
  }

  // showcase error  if there is after blur
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
      return hasError ? shouldShow : false;
    };
    this.componentWillMount
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
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

        {/* Email Inputs,auto fill suggestions and Error Text */}
        <Text style={styles.upperPlaceholder}>Email</Text>
        <TextInput style = {styles.input}
                refs = "email"
                placeholder = "input email address"
                placeholderTextColor = "#9a73ef"
                underlineColorAndroid = 'transparent'
                autoCapitalize = "none"
                autoCorrect = {false}
                onChangeText = {(text) => this.onTextChange(text)}
                value ={this.state.fields["email"]}
                onBlur={this.handleBlur('email')}
        />
        {this.renderSuggestions()}
        <Text style={styles.errorText}>{ shouldMarkError("email") ? this.state.errors["email"] : ' '}</Text>
      
        {/* Password Inputs and Error Text */}
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
                onBlur={this.handleBlur('password')}
        />
        <Text style={styles.errorText}>{shouldMarkError("password") ? this.state.errors["password"] : ' '}</Text>  
        
        {/* CheckBox from react-native elements since based on my research there isnt a checkbox native for IOS */}
        <CheckBox style={styles.checkBox}
          title= 'Remember me' 
          checkedColor= '#9a73ef'  
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
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

        {/* Sign in Button  */}
        <TouchableOpacity
            disabled ={isDisabled}
            style = {isDisabled ? styles.disabledSubmitButton : styles.submitButton}
            onPress = {
              () => this.login()
            }>
            <Text style ={isDisabled ? styles.disabledSubmitButtonText :styles.submitButtonText} >Sign In</Text>    
        </TouchableOpacity> 
      </View>
      
    </View>
    );
  }
}