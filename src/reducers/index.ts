import { combineReducers } from 'redux';

import counter from './counter';
import currentUser from './currentUser';
import entryItem from './entryTeam';

const rootReducer = combineReducers({
  currentUser,
  counter,
  entryItem,
});

export default rootReducer;
