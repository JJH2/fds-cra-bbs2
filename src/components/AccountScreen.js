import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const Wrap = styled.div``;

export default class AccountScreen extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const nickName = e.target.elements.nickName.value;
    this.props.onNickNameSubmit(nickName);
  }
  render() {
    const { nickName, onNickNameClick } = this.props;
    return (
      <Wrap>
        <NavBar nickName={nickName} onNickNameClick={onNickNameClick} />
        <form action="" onSubmit= { this.handleSubmit }>
          <input type="text" name="nickName"/>
          <button type="submit">저장</button>
        </form>

      </Wrap>
    )
  }
}
