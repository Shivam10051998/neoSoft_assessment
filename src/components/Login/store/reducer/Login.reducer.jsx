import * as Actions from '../action';

const initialState = {
  getLoginRes:''
};

const LoginData = function (state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN: {
      return {
        ...state,
        getLoginRes: action.getLoginRes,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginData;
