const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const Auth = new mongoose.model("authentications", authSchema);

module.exports = Auth;