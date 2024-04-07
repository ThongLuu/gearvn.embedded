import { SHOW_LOADING } from './actions';

const initialState = {
  loading: {
    isLoading: 0,
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_LOADING:
      return Object.assign({}, state, {
        loading: { ...action, isLoading: state.loading.isLoading + action.isLoading },
      });
    default:
      return state;
  }
};
