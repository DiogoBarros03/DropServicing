const mongoose = require("mongoose")

const checkout_schema = mongoose.Schema(
    {   
        
        first_name : {
            type: String,
            required: [true,"Please insert an First Name"]
        },
        last_name:{
            type: String,
            required: [true,"Please insert an Last Name"]
        },
        email: {
            type: String,
            required: [true,"Please insert an email"]
        },
        text : {
            type: String,
            required: [true,"Please insert an Text"]
        },
        package: {
            type: Integer,
            required: [true]
        },
        language_from : {
            type: String,
            required: [true]
            
        },
        language_to : {
            type: String,
            required: [true]

        }
        

    },
    {
        timestamps: true
    }
)

const Checkout = mongoose.model('Checkout',checkout_schema);

module.exports = Checkout