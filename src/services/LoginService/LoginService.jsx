import React from 'react';
import axios from 'axios';

class LoginService extends React.Component {
  getLoginResponse = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://localhost:300/login`,data)
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
const instance = new LoginService();
export default instance;
