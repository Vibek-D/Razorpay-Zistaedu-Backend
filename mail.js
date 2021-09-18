const nodemailer = require('nodemailer');

const sendMail = (req) => {
    const output = `
    <p>You have a new registration</p>
    <h3>Registration Details</h3>
    <ul>  
      <li>Name: ${req.body.fname} ${req.body.lname}</li>
      <li>Email: ${req.body.email}</li>
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