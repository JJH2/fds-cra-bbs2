import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleListScreen extends Component {
  render() {
    const {nickName, onNickNameClick} = this.props;
    return (
      <div>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        게시글 목록
      </div>
    )
  }
}
