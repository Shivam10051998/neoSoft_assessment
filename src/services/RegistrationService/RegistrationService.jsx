import React from 'react';
import axios from 'axios';

class RegistrationService extends React.Component {
  postRegistration = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:300/register`,data)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject('Unable to fetch Data');
          }
        })

        .catch((error) => {
          reject('something went wrong.');
        });
    });
  };

}
const instance = new RegistrationService();
export default instance;
