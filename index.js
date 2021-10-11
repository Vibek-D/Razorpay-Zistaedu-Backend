const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const shortid = require('shortid');
const sendMail = require('./mail');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');

mongoose.connect(process.env.MONGOOSE_KEY).then(() => {
    console.log('Mongodb Connected')
}).catch((err) => console.log(err))

const zistaEduUserSchema = { 
    email: String,
    fName: String,
    lName: String,
    instName: String,
    instAddress: String,
    phNumber: String,
    officePhone: String 
}

const zistaEduUserModel = mongoose.model("ZistaEduUserModel", zistaEduUserSchema);

const razorpay = new Razorpay({
    "key_id": process.env.KEY_ID,
    "key_secret": process.env.KEY_SECRET,
})

const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/order', async (req, res) => {
    let options = {
        currency: req.body.currency,
        amount: req.body.amount,
        receipt: req.body.receipt,
    }
    console.log(options);
    await razorpay.orders.create(options, (err, order) => {
        console.log(err)
        console.log(order)
        res.json(order);
    });
});

app.get('/', (req, res) => {
    res.send('Server Pinged ');
});

app.post('/api/order_complete', async (req, res) => {
    await razorpay.payments.fetch(req.body.razorpay_payment_id).then((response) => {
        console.log(response);
        if (response.status === 'authorized' || response.status === 'captured') {
            res.render('success');
        } else {
            res.render('error');
        }
    });
});

app.post('/api/submit', async (req, res) => {
    let newUser = new zistaEduUserModel({ 
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        instName: req.body.instName,
        instAddress: req.body.instAddress,
        phNumber: req.body.phNumber,
        officePhone: req.body.officePhone 
    })
    console.log(newUser)
    await newUser.save();
    res.json(newUser);
});

app.post('/mail', async (req, res) => {
    sendMail(req);
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});