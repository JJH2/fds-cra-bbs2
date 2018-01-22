import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';

export default class BBS extends Component {
  state = {
    page: 'login'
  }
  pageToAccount = () => {
    this.setState({
      page: 'account'
    });
  }
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyBXc3tUGlmsFA5ub_rLc_wF-sw6QGM_HYw",
      authDomain: "fds-cra-bbs-790f1.firebaseapp.com",
      databaseURL: "https://fds-cra-bbs-790f1.firebaseio.com",
      projectId: "fds-cra-bbs-790f1",
      storageBucket: "",
      messagingSenderId: "125390268893"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const snapshot = await firebase.database().ref(`users/${user.uid}/nickName`).once('value');
        this.setState({
          page: 'list',
          uid: user.uid,
          nickName: snapshot.val()
        });
      } else {
        this.setState({
          page: 'login'
        });
      }
    });
  }

  saveNickName = async nickName => {
    const {uid} = this.state;
    await firebase.database().ref(`users/${uid}/nickName`).set(nickName)
    this.setState({
      nickName,
      page: 'list'
    })
  }

  render() {
    const { nickName, uid } = this.state;
    return (
      <div>
      {
        this.state.page === 'login'
        ? <LoginScreen />
        : this.state.page === 'list'
        ? <ArticleListScreen
        onNickNameClick={ this.pageToAccount }
        nickName={ nickName || uid } />
        : this.state.page === 'account'
        ? <AccountScreen
        onNickNameClick={ this.pageToAccount }
        nickName={ nickName || uid }
        onNickNameSubmit={ this.saveNickName } />
        : null
      }
      </div>
    )
  }
}
