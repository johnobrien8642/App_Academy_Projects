import React from 'react';
import { Route, Switch } from 'react-router-dom'
import GodsList from '../components/gods/GodsList'
import CreateIndex from '../components/create/CreateIndex'
import EmblemsList from './emblems/EmblemsList';
import AbodesList from './abodes/AbodesList';
import GodDetail from './gods/GodDetail';
import AbodeCreate from './create/AbodeCreate';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/gods/:id' component={GodDetail} />
        <Route path='/new' component={CreateIndex} />
        <Route path='/emblems' component={EmblemsList} />
        <Route exact path='/' component={GodsList} />
        <Route exact path='/abode/new' component={AbodeCreate} />
      </Switch>
    </div>
  )
}

export default App;