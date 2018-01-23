import React, {Component} from 'react';
import * as firebase from 'firebase';

import LoginScreen from './LoginScreen';
import ArticleListScreen from './ArticleListScreen';
import AccountScreen from './AccountScreen';
import ArticleScreen from './ArticleScreen';
import NewArticleScreen from './NewArticleScreen';


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
        this.fetchArticles();
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

  fetchArticles = async () => {
    const snapshot = await firebase.database().ref(`articles`).once('value');
    const articlesObj = snapshot.val();
    if (articlesObj == null) {
      this.setState({
        articles: null
      })
    } else {
      const articles = Object.entries(articlesObj).map(([articleId, articleItem]) => {
        return {
          articleId,
          ...articleItem
        }
      });
      // const uidArr = articles.map(articles => articles.uid)
      const uidSet = new Set(articles.map(({uid}) => uid));
      const uidObj = {};
      const ps = Array.from(uidSet).map(async uid => {
        const snapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
        const nickName = snapshot.val();
        return [uid, nickName];
      })
      const pairArr = await Promise.all(ps);
      for (const [uid, nickName] of pairArr) {
        uidObj[uid] = nickName;
      }

      console.log(uidObj);
      // for (const uid of uidArr) {
      //   const nickNameSnapshot = await firebase.database().ref(`users/${uid}/nickName`).once('value');
      //   const nickName = nickNameSnapshot.val()
      //   uidObj[uid] = nickName;
      // }
      articles.forEach(article => {
        article.author = uidObj[article.uid];
      })
      this.setState({
        articles
      })
    }
  }

  viewArticle = async articleId => {
    const [articleSnapshot, contentSnapshot] = await Promise.all([
      firebase.database().ref(`articles/${articleId}`).once('value'),
      firebase.database().ref(`contents/${articleId}`).once('value')
    ])
    const article = articleSnapshot.val();
    const content = contentSnapshot.val();
    this.setState({
      currentArticle: {
        ...article,
        content
      },
      page: 'article'
    })
  }
  pageToNewArticle = () => {
    this.setState({
      page: 'new-article'
    });
  }
  // 새글 저장
  saveArticle = async (article) => {
    console.log(article);
    const p1 = firebase.database().ref(`articles`).push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      title: article.title,
      uid: this.state.uid
    })
    const p2 = firebase.database().ref(`contents/${p1.key}`).set(article.content);
    await Promise.all([p1, p2]);
    this.viewArticle(p1.key);
  }

  render() {
    const { nickName, uid, articles, currentArticle } = this.state;
    return (
      <div>
      {
        this.state.page === 'login'
        ? <LoginScreen />
        : this.state.page === 'list'
        ? <ArticleListScreen
            onNickNameClick={ this.pageToAccount }
            nickName={ nickName || uid }
            articleArr={ articles }
            onArticleClick={ this.viewArticle }
            onNewArticleClick={ this.pageToNewArticle }
          />
        : this.state.page === 'account'
        ? <AccountScreen
            onNickNameClick={ this.pageToAccount }
            nickName={ nickName || uid }
            onNickNameSubmit={ this.saveNickName }
          />
        : this.state.page === 'article'
        ? <ArticleScreen
            { ...currentArticle }
            onNickNameClick={this.pageToAccount}
            nickName={nickName || uid}
          />
        : this.state.page === 'new-article'
        ? <NewArticleScreen onFormSubmit={ this.saveArticle }/>
        : null
      }
      </div>
    )
  }
}
