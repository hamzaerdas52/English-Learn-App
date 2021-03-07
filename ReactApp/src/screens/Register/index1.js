import React, { Component, useState, useEffect } from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import Home from '../Home/index'

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: '447608861005-prrtt2v1n7el7oth3mg58gkphnsjj0ae.apps.googleusercontent.com',
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '',
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '',
});

App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default class RegisterGoogle extends Component {

  createUser = () => {
    auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  logIn = () => {
    auth()
      .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  logOff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  constructor() {
    super()
    this.state = {
      loaded: false,
    }
  }

  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    this.setState({loaded:true})

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);

    (this.state.loaded) ? this.props.navigation.navigate('Home') : console.log('Giriş başarısız')

  }

  render() {
    return (
      <View>
        <App />
        <TouchableOpacity onPress={this.createUser}>
          <Text>Kayıt ol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logIn}>
          <Text>Giriş yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logOff}>
          <Text>Çıkış yap</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          style={{ width: 222, height: 48, top: 50 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.onGoogleButtonPress().then(()=>console.log('is signed with google'))}
        />
      </View>
    )
  }
}
