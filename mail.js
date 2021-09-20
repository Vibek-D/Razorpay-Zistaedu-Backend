const nodemailer = require('nodemailer');

const sendMail = (req) => {
    const output = `
    <h2>You have a new registration</h2>
    <h3>Registration Details</h3>
    <ul>  
      <li>Name: ${req.body.fName} ${req.body.lName}</li>
      <li>Email: ${req.body.email}</li>
      <li>Institute Name: ${req.body.instName}</li>
      <li>Institute Address: ${req.body.instAddress}</li>
      <li>Phone Number: ${req.body.phNumber}</li>
      <li>Office Phone Number: ${req.body.officePhone}</li>
    </ul>
  `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'twinkiestwinky1998@gail.com',
        to: req.body.email,
        subject: 'Zista Events Registration',
        html: output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;