import { combineReducers } from 'redux';
import loginData from 'components/Login/store/reducer';
import regData from 'components/Registeration/store/reducer';

export default combineReducers({
    loginData: loginData,
    regData:regData
})