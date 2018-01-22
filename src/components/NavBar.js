import React, {Component} from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const Wrap = styled.nav`
  background-color: skyblue;
  padding: 1em;
  display: flex;
  align-items: center;
`;

const InnerLeft = styled.div`
  flex-grow: 1;
  color: white;
  font-size: 2em;
`;

const LogOutButton = styled.button`
  padding: 1em;
  border: none;
  background-color: white;
`;

const NickName = styled.a`
  color: white;
`;

export default class NavBar extends Component {
  handleLogoutClick = () => {
    firebase.auth().signOut();
  }

  handleNickNameClick = e => {
    this.props.onNickNameClick();
  }

  render() {
    const {nickName} = this.props;
    return (
      <Wrap>
        <InnerLeft>BBS</InnerLeft>
        <LogOutButton onClick={this.handleLogoutClick}>로그아웃</LogOutButton>
        <NickName onClick={this.handleNickNameClick}>{nickName}</NickName>
      </Wrap>
    )
  }
}
