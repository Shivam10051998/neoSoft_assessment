import * as Actions from '../action';

const initialState = {
  getRegRes:''
};

const RegData = function (state = initialState, action) {
  switch (action.type) {
    case Actions.REGISTRATION: {
      return {
        ...state,
        getRegRes: action.getRegRes,
      };
    }
    default: {
      return state;
    }
  }
};

export default RegData;
