const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const keyPath = 'path/to/service-account-key.json'; // Replace with your service account key file
const credentials = require('./g2_sample_key.json');

const jwtClient = new google.auth.JWT(
  {
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/gmail.send'],
  }
);

jwtClient.authorize(async(err, tokens) => {
  if (err) {
    console.error('Error authorizing JWT client:', err);
    return;
  }

  // Create a Nodemailer transporter using the JWT client

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: credentials.client_email,
      clientId: credentials.client_id,
      privateKey: credentials.private_key,
      // accessToken:tokens.access_token,
      // refreshToken:tokens.refresh_token,
      // expires:tokens.expiry_date,
      
    },
  });

  await transporter.verify();
  // Send an email
  transporter.sendMail({
    from:credentials.client_email,
    to:'gurkhudeganesh@gmail.com',
    subject:'Test Email',
    text:'hello'
  } ,(err, info) => {
    if (err) {
      console.error('Error sending mail:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });

});




