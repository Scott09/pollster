const mailgunAPI = require('mailgun-js');
const mailgun = mailgunAPI({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});



const mailgunSend = function(data) {
  return new Promise((resolve, reject) => {
    Object.assign(data, { from: `Pollster <me@${process.env.MAILGUN_DOMAIN}>`});
    mailgun.messages().send(data, (error, body) => {
      if (error) return reject(error);
      resolve(body);
    })
  });
};

exports.mailgunSend = mailgunSend;

const mailgunCreate = function(email, adminlink, submissionlink) {
  return mailgunSend({
    to: email,
    subject: 'Poll created',
    text: `
    Hi there,

    Here are the results: ${adminlink}
    And here is the submission link: ${submissionlink}

    Thanks!

    Pollster`
  });
};

exports.mailgunCreate = mailgunCreate;

const mailgunSubmit = function(email, adminlink) {
  return mailgunSend({
    to: email,
    subject: 'Poll submission',
    text: `
    Hi there,

    Another submission has been recorded!
    Here are the results: ${adminlink}

    Thanks!

    Pollster`
  });
};

exports.mailgunSubmit = mailgunSubmit;
