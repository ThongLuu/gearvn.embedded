import { TOAST, TOAST_CLEAR } from './actions';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOAST:
      return Object.assign({}, state, {
        ...action,
      });
    case TOAST_CLEAR:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};
