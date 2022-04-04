import LoginServices from 'services/LoginService';
export const LOGIN = 'LOGIN';

export function getLoginResponse(data) {
  return (dispatch) => {
    LoginServices.getLoginResponse(data)
      .then((getLoginRes) => {
        dispatch({
          type: LOGIN,
          getLoginRes,
        });
        return getLoginRes;
      })
      .catch((error) => {
        throw error;
      });
  };
}




