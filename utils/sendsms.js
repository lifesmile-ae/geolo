import axios from 'axios';

const sendSMS = async (number, message) => {
  var data = JSON.stringify({
    message: {
      from: 'Lifesmile',
      to: number,
      content: message,
    },
  });

  var config = {
    method: 'post',
    url: 'https://smpplive.com/api/v2/send_sms/single_sms',
    headers: {
      'content-type': 'application/json',
      Authorization: process.env.RIVET_AUTHORIZATION,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      return error;
    });
};

export default sendSMS;
