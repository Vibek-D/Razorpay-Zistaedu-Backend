const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
var shortid = require('shortid');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    "key_id": process.env.KEY_ID,
    "key_secret": process.env.KEY_SECRET,
})

const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/order', async(req, res) => {
    let options = {
        currency: req.body.currency,
        amount: req.body.amount,
        receipt: req.body.receipt,
    }

    await razorpay.orders.create(options, (err, order) => {
        res.json(order);
    });
});

app.get('/', (req, res) => {
    res.send('Server pinged');
});

app.post('/order_complete', (req, res) => {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((resp) => {
        console.log(`final`, resp)
        if (resp.status === 'authorized' || resp.status === 'captured') {
            res.render('success');
        } else {
            res.render('error');
        }
    });
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json(req.body.data);
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});