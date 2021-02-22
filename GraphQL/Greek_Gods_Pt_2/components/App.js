import React from 'react';
import { Route, Switch } from 'react-router-dom'
import GodsList from '../components/gods/GodsList'
import CreateIndex from '../components/create/CreateIndex'
import EmblemsList from './gods/EmblemsList';
import AbodesList from './gods/AbodesList';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={GodsList} />
        <Route path='/new' component={CreateIndex} />
        <Route exact path='/abodes' component={AbodesList} />
        <Route path='/emblems' component={EmblemsList} />
      </Switch>
    </div>
  )
}

export default App;