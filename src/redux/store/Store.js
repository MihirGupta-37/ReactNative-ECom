import {createStore} from 'redux';
import reducers from '../reducers/Reducers';

export const store = createStore(reducers);
