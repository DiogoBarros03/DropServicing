const mongoose = require("mongoose")

const email_schema = mongoose.Schema(
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
        }

    },
    {
        timestamps: true
    }
)

const Email = mongoose.model('Email',email_schema);

module.exports = Email