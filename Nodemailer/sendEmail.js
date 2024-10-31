// How can I send an email with attachments using nodemailer in Node.js?

// To send an email with attachments using nodemailer in Node.js, you can use the sendMail method of the transporter object. Here's a step-by-step plan:

// Create a transporter using nodemailer.createTransport().
// Call transporter.sendMail() with an options object that includes attachments.

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

let mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient-email@gmail.com',
  subject: 'Test mail',
  text: 'Hello, this is a test email!',
  attachments: [
    {
      filename: 'test.txt',
      path: './test.txt' // Replace by your file path
    }
  ]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// In this code, replace 'your-email@gmail.com' and 'your-password' with your Gmail email and password. The mailOptions object includes an attachments array where each item represents a file to attach to the email. Each item should be an object with filename and path properties.

// Next steps could include:

// Handling potential errors in email sending.
// Customizing the email content and attachments.
// Securing your email credentials, such as by storing them in environment variables
//=======================================

// 2] How can I send an email with HTML content using nodemailer in Node.js?

// To send an email with HTML content using nodemailer in Node.js, you can use the html property in the mailOptions object when calling transporter.sendMail(). Here's a step-by-step plan:

// Create a transporter using nodemailer.createTransport().
// Call transporter.sendMail() with an options object that includes html.

const nodemailer = require('nodemailer');

 transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

 mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient-email@gmail.com',
  subject: 'Test mail',
  html: '<h1>Hello</h1><p>This is a test email!</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


// In this code, replace 'your-email@gmail.com' and 'your-password' with your Gmail email and password. The html property in the mailOptions object contains the HTML content of the email.

// Next steps could include:

// Handling potential errors in email sending.
// Customizing the HTML content of the email.
// Securing your email credentials, such as by storing them in environment variables.