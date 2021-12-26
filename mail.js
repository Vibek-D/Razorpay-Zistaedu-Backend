const nodemailer = require('nodemailer');

const sendMail = async (req) => {
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
  if (req.body.userData) {
    let output = `
            <h2>You have a new registration</h2>
            <h3>Registration Details</h3>
            <ul>
                <li>Payment Method: ${req.body.userData.paymentType}</li>
                <li>Name: ${req.body.userData.fName} ${req.body.userData.lName}</li>
                <li>Email: ${req.body.userData.email}</li>
                <li>Institute Name: ${req.body.userData.instName}</li>
                <li>Institute Address: ${req.body.userData.instAddress}</li>
                <li>Phone Number: ${req.body.userData.phNumber}</li>
                <li>Office Phone Number: ${req.body.userData.officePhone}</li>
            </ul>
            <h3>Selected Events</h3>
        `;
    for (const i of req.body.orderData) {
      const eventsTags = `<div style="display: 'flex', justifyContent: 'space-between'"}>
                            <span>${i.mainEvent}</span>
                            <span style="margin-left: 30px">Webinar Selected: ${i.webinar}</span>
                            <span style="margin-left: 30px">Breakout Selected: ${i.breakout}</span>        
                          </div>`
      output = output + eventsTags;
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: ['mitali.r@zistaeducation.com', 'amit.a@zistaeducation.com'],
      subject: 'Zista Events Registration',
      html: output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log('Email sent: ' + data.response);
        res.send(data.response);
      }
    });
  } else {
    let output = `
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
            <h3>Selected Events</h3>
        `;
    const mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: 'Zista Events Registration',
      html: output,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log('Email sent: ' + data.response);
        res.send(data.response);
      }
    });
  }
}

module.exports = sendMail;