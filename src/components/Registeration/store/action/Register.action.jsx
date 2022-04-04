import RegistrationServices from 'services/RegistrationService';
export const REGISTRATION = 'REGISTRATION';

export function postRegistration(data) {
  return (dispatch) => {
    RegistrationServices.postRegistration(data)
      .then((getRegRes) => {
        dispatch({
          type: REGISTRATION,
          getRegRes,
        });
        return getRegRes;
      })
      .catch((error) => {
        throw error;
      });
  };
}




