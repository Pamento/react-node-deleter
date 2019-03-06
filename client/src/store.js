import {createStore, applyMiddleware } from 'redux'
import root  from './reducers/root';
import thunk from 'redux-thunk';

export default  createStore(
  root,
  applyMiddleware(thunk)
)