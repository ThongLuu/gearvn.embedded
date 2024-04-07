import { CONTROLLERS } from './actions';

const initialState = {
  topbar: {
    leftItems: [],
    rightItems: [],
  },
};

export default (state = initialState, action = { ...initialState.topbar }) => {
  switch (action.type) {
    case CONTROLLERS:
      return Object.assign({}, state, {
        topbar: {
          leftItems: action.leftItems,
          rightItems: action.rightItems,
        },
      });
    default:
      return state;
  }
};
