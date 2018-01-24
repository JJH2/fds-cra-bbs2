import React, { Component } from 'react';
import config from '../config';
import styled from 'styled-components';

const Button1 = styled.button`
  background-color: ${config.colorMap.GreyscaleColors.Greyscale3};
  color: ${config.colorMap.GreyscaleColors.Greyscale7};
  border: 1px solid ${config.colorMap.GreyscaleColors.Greyscale7};
  padding: 1em;
  &.denger {
    background-color: ${config.colorMap.SubColors.RedLight1};
    color: ${config.colorMap.SubColors.RedDark1};
    border: 1px solid ${config.colorMap.SubColors.RedDark1};
  }
`

export default class BTN extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <Button1 className={className}>{children}</Button1>
    )
  }
}
