import React, {Component} from 'react';
import NavBar from './NavBar';

export default class ArticleScreen extends Component {
  render() {
    const { title, content, onNickNameClick, nickName} = this.props;
    return (
      <div>
        <NavBar onNickNameClick={onNickNameClick} nickName={nickName}/>
        {title}
        {content}
      </div>
    )
  }
}
