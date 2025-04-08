const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String
});

const MyData = mongoose.model('myData', userSchema);

module.exports = MyData;