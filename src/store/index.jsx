import {createStore,applyMiddleware} from 'redux';
import reducers from './reducer';
import ReduxThunk from 'redux-thunk'

const store = createStore(reducers,{},applyMiddleware(ReduxThunk));

export default store;