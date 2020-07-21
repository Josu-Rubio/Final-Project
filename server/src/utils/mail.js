'use strict';

const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');
const ejs = require('ejs-promise');
const juice = require('juice');

require('dotenv').config();

const mailViews = `${__dirname}/../views/mails/`;

const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});

const generateHTML = async (view, options = {}) => {
  return ejs.renderFile(
    `${mailViews}${view}.ejs`,
    options,
    {},
    (error, result) => {
      if (error) {
        throw 'Error generating mail template';
      }
      return result;
    }
  );
};

module.exports = (options) => {
  try {
    generateHTML(options.view, options).then((result) => {
      const html = juice(result);
      let mailOptions = {
        from: 'Wallaclone App <no-reply@wallaclone.com>',
        to: options.email,
        subject: options.subject,
        text: htmlToText.fromString(html),
        html: html,
      };
      transport.sendMail(mailOptions);
    });
  } catch (error) {
    console.log(error);
  }
};
