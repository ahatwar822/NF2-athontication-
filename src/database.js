mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/athontication').then(() => {
    console.log("connected to database ; local mongodb server");
}).catch((err) => {
    console.log(err);
});

Schema = mongoose.Schema({
    uname: String,
    pass: String
});
console.log("schema created");

StudentModel = mongoose.model('student', Schema);

module.exports = StudentModel;
