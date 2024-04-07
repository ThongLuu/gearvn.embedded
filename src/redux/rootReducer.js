
import { combineReducers } from 'redux'

import loadingReducer from '../components/Loading/redux/reducer';
import topbarReducer from '../components/TopBar/redux/reducer';
import toastReducer from '../components/Page/redux/reducer';

export const rootReducer = combineReducers({
  loadingState: loadingReducer,
  toastState: toastReducer,
  topbarState: topbarReducer,
});
