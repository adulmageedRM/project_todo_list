const {Schema , model} = require("mongoose");

const usersSchema=new Schema({
    email: { type: String , required: true , unique: true },
    password: {type: String , required: true},
    username: String,
});

// Model
const User=model('User',usersSchema);


module.exports = User;



