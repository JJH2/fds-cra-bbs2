import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result.user);
    })
  }
  render() {
    return (
      <button onClick={this.handleLoginClick}>구글로 로그인</button>
    )
  }
}
