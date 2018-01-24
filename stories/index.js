import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import NavBar from '../src/components/NavBar';
import BTN from '../src/components/BTN';


storiesOf('BBS', module)
  .add('NavBar', () => <NavBar/>)

storiesOf('Button', module)
  .add('BTN', () => <BTN className="denger">아아아</BTN>)
