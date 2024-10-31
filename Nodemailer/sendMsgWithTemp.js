const nodemailer = require('nodemailer');
const Email = require('email-templates');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Your email service configuration
});

// Create an instance of Email
const email = new Email({
  message: {
    from: 'sender@example.com',
  },
  // Specify the path to your email templates
  send: true,
  preview: false,
  transport: transporter,
});

// Define email options and dynamic content
const emailOptions = {
  message: {
    to: 'recipient@example.com',
  },
  locals: {
    username: 'John Doe',
    // other dynamic content
  },
};

// Send the email using the template
email
  .send({
    template: 'path/to/your/template', // path to your template folder
    message: emailOptions.message,
    locals: emailOptions.locals,
  })
  .then(console.log)
  .catch(console.error);

//---------Email with templete------------------------------
  email = new Email({
    message: {
      from: 'sender@example.com',
    },
    send: true,
    preview: false,
    transport: transporter,
    views: {
      root: 'path/to/your/templates', // path to your template folder
    },
  });
  

  