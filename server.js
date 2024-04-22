const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const app = express()
const port = 3000
const orderModel = require("./model/order_model");


const razorpay = new Razorpay({
  key_id: "rzp_test_qjtZWtqrWfPQrH",
  key_secret: "t0G0YZYotSlt8mDYNTHRqP6A",
})

//connection
mongoose.connect('mongodb://localhost:27017/Employees')
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => console.log(err));

//middleweres
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))

//routes
app.post('/payment/checkout', async (req, res) => {
  try {
    const { name, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
    });

    await orderModel.create({
      order_id: order.id,
      name: name,
      cost: amount,
      amount: amount
    });

    console.log(order);
    res.json(order);
  } catch (error) {
    console.error('Error in /payment/checkout:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})