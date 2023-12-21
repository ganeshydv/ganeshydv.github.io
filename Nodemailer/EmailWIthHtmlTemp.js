class MailBl{
    
    constructor(){
        var transporter = nodemailer.createTransport(Config().MAILER_OPTION);
        this._templateSender = new Email({
          transport: transporter,
          send: true,
          preview: false,
          views: {
            options: {
              extension: "ejs"
            },
            root: "app/email_templates"
          }
        });
    }

    async sendTextMail(
        toAddress,
        subject,
        body,
        fileName,
        fileContent
      ) {
        var mailOptions = {
          from: "xyz@mail.com", // sender address
          to: toAddress, // list of receivers
          subject: subject, // Subject line
          text: body,
          attachments: fileName?[
            {
              // utf-8 string as an attachment
              filename: fileName,
              content: fileContent
            }
          ]:null
        };
        return this._transporter.sendMail(mailOptions);
      }

    
  async sendTemplateMail(toAddress, template_path, data) {
    return this._templateSender.send({
      template: template_path,
      message: {
        from: "xyz@gmail.com",
        to: toAddress
      },
      locals: data
    });
  }
  async sendTemplateMailWithSubject(toAddress, template_path, data, subject) {
    return this._templateSender.send({
      template: template_path,
      message: {
        from: "xyz@gmail.com",
        to: toAddress,
        subject: subject
      },
      locals: data
    });
  }

}