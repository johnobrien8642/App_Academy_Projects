import React from 'react';
import Clock from './clock'
import Tabs from './tabs'
import AutoComplete from './autocomplete'
import Weather from './weather'

const panes = [
  { title: 'one', content: 'I am the first' },
  { title: 'two', content: 'Second pane here' },
  { title: 'three', content: 'Third pane here' }
];

const names = [
  'Abba',
  'Barney',
  'Barbara',
  'Jeff',
  'Jenny',
  'Sarah',
  'Sally',
  'Xander'
];

class RootComponent extends React.Component {
  render () {
    return (
      <div className='react-insert'>
        <Clock />
        <Weather />
        <div className='interactive'>
          <Tabs panes={panes} />
          <AutoComplete names={names} />
        </div>
      </div>
    );
  }
}

export default RootComponent;

