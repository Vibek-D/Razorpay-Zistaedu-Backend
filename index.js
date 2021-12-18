const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const shortid = require('shortid');
const sendMail = require('./mail');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const ObjectId = require('mongodb').ObjectId;

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
    officePhone: String,
    paymentType: String,
}

const zistaEduUserModel = mongoose.model("ZistaEduUserModel", zistaEduUserSchema);

const razorpay = new Razorpay({
    "key_id": process.env.KEY_ID,
    "key_secret": process.env.KEY_SECRET,
})

const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(cors());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/order', async (req, res) => {
    const updatedData = await zistaEduUserModel.findOneAndUpdate(
        {
            _id:new ObjectId(req.body.userData._id),
        }, {
            $set: {
                paymentType: req.body.paymentType,
            }
    }, {
        upsert: true,
        new: true,
    });
    if (updatedData) {
        res.json(updatedData);
    } else {
        res.json(updatedData);
    }
});

app.get('/api/deleteAll', async (req, res) => {
    await zistaEduUserModel.deleteMany({ "fName" : "" });
});

app.get('/', (req, res) => {
    res.send('Server Pinged');
});

app.post('/api/order_complete', async (req, res) => {
    console.log(req.body);
    if (req.body.type === 'success') {
        res.render('success');
    } else {
        res.render('error');
    }
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
    console.log(newUser);
    await newUser.save();
    res.json(newUser);
});

app.post('/api/mail', async (req, res) => {
    console.log(req.body);
    await sendMail(req);
    res.status(200).json({
        status: 'ok',
    });
});

app.get('/api/download', async (req, res) => {
    await zistaEduUserModel.find().then((data) => {
        console.log(data);
        res.status(200).json({
            userData: data
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    })
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
