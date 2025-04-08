# Accessing AWS SES using AWS SDK v2 and v3

## Overview
Amazon Simple Email Service (SES) is a cloud-based email sending service designed for bulk and transactional email use cases. AWS provides SDKs to interact with SES, with notable differences between **aws-sdk v2** and **aws-sdk v3**.

---

## 1. Installing Dependencies

### AWS SDK v2
```sh
npm install aws-sdk
```

### AWS SDK v3
```sh
npm install @aws-sdk/client-ses
```

---

## 2. Importing Required Modules

### AWS SDK v2
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ses = new AWS.SES();
```

### AWS SDK v3
```javascript
const { SESClient, SendEmailCommand, VerifyEmailIdentityCommand } = require("@aws-sdk/client-ses");

const client = new SESClient({ region: "us-east-1" });
```

---

## 3. Verifying an Email Address
Before you can send emails via SES, you need to verify the sender's email address.

### AWS SDK v2
```javascript
const params = {
  EmailAddress: "sender@example.com"
};

ses.verifyEmailIdentity(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Verification Sent", data);
});
```

### AWS SDK v3
```javascript
const command = new VerifyEmailIdentityCommand({ EmailAddress: "sender@example.com" });
client.send(command)
  .then(data => console.log("Verification Sent", data))
  .catch(error => console.error("Error", error));
```

---

## 4. Sending an Email

### AWS SDK v2
```javascript
const params = {
  Source: "sender@example.com",
  Destination: {
    ToAddresses: ["recipient@example.com"]
  },
  Message: {
    Subject: { Data: "Test Email" },
    Body: {
      Text: { Data: "Hello from AWS SES!" }
    }
  }
};

ses.sendEmail(params, (err, data) => {
  if (err) console.error("Error", err);
  else console.log("Email Sent", data);
});
```

### AWS SDK v3
```javascript
const params = {
  Source: "sender@example.com",
  Destination: {
    ToAddresses: ["recipient@example.com"]
  },
  Message: {
    Subject: { Data: "Test Email" },
    Body: {
      Text: { Data: "Hello from AWS SES!" }
    }
  }
};

const command = new SendEmailCommand(params);
client.send(command)
  .then(data => console.log("Email Sent", data))
  .catch(error => console.error("Error", error));
```

---

## 5. Sending an Email with Attachments (SES v2 API using SMTP)
SES does not natively support attachments via the API, but you can use **nodemailer** with an SMTP configuration.

### Installation
```sh
npm install nodemailer
```

### Sending Email with Attachment
```javascript
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 465,
  secure: true,
  auth: {
    user: "SMTP_USERNAME", // Get from AWS SES
    pass: "SMTP_PASSWORD"  // Get from AWS SES
  }
});

const mailOptions = {
  from: "sender@example.com",
  to: "recipient@example.com",
  subject: "Test Email with Attachment",
  text: "Hello, please find the attachment.",
  attachments: [{
    filename: "test.pdf",
    path: "./test.pdf"
  }]
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error("Error", err);
  else console.log("Email Sent", info);
});
```

---

## 6. Differences Between AWS SDK v2 and v3

| Feature                | AWS SDK v2                      | AWS SDK v3                      |
|------------------------|--------------------------------|--------------------------------|
| Installation          | `npm install aws-sdk`          | `npm install @aws-sdk/client-ses` |
| Modular Imports      | No                              | Yes (Reduces bundle size)      |
| Method Calls         | Callback-based API             | Promise-based API (async/await) |
| Performance          | Loads entire SDK               | Loads only required modules    |

---

## 7. Best Practices
- **Use SDK v3** for better performance and modularity.
- **Verify Email Addresses** before sending emails.
- **Use IAM Policies** to limit SES permissions.
- **Implement DKIM and SPF** for improved email deliverability.
- **Use a Dedicated IP Pool** for high-volume email sending.

---

## 8. Conclusion
AWS SDK v3 is more modular, efficient, and uses promises, making it a better choice for new applications. However, SDK v2 is still widely used and supported.

---

