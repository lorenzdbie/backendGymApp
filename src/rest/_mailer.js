const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');


let transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'cddb9c45d69ce0',
    pass: '9167db308c896a',
  },
});


// let transport = nodemailer.createTransport(smtpTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'info.4.fitnessapp@gmail.com',
//     pass: 'WhatIsStrong12',
//   },
// }));

module.exports = transport;                           