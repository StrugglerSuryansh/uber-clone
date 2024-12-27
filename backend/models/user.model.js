const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userschema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            min: 3
        },
        lastname: {
            type: String,
            min: 3
        },
    },

    Email: {
        type: String,
        required: true,
        min: 6
    },
    Password: {
        type: String,
        required: true,
        select: false

    },

    socketId: {
        type: String,

    },
});


//token generate karna
userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
    return token;
}



userschema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.Password);
}

//password ko hash karna
userschema.static.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('User', userschema);


module.exports = userModel;