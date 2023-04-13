// Core modules
const process = require('node:process');

// Third-party modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer")
const mongoose = require('mongoose');
require('dotenv').config();

// Local modules
const Email = require('./database/models/email-model');
const Checkout = require('./database/models/checkout-model');

// App setup
const app = express();
app.use(cors());
app.use(bodyParser.json());




app.get("/", function(req,res){
    res.send("Hello World")

})

app.post('/create-payment-intent', async (req, res) => {

    try {
        const { amount, currency } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
        });
        Email.findOne({email:data.email}, async function(err,existingEmail){
            if(existingEmail == null){
                email = {
                    email:data.email, 
                    first_name: data.first_name, 
                    last_name:data.last_name
                }
                const doc = await  Email.create(email)
                
                // doc instanceof Email; // true
                // doc.email; // 'bill@microsoft.com'
                //res.status(200).json({message: "Email "})
                
            }
            // else{
            //     // res.sendStatus(401)
            // }
            
        })
        const data = req.body
        checkout = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            text: data.text,
            package: data.package,
            language_from: data.language_from,
            language_to: data.language_to
        }

        await Checkout.create(checkout)

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });
  
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
},
});

app.post('/send-receipt', async (req, res) => {
    const { to, subject, receiptContent } = req.body;

    const mailOptions = {
        from: 'noreply',
        to: to,
        subject: subject,
        html: receiptContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000,() =>{
    console.log("Server listening in port 3000")
})
mongoose.set("strictQuery",false)

mongoose.connect("mongodb+srv://transall:"+process.env.PASSWORD+"@transall.ydlaehr.mongodb.net/transall-db?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log(error)
})

