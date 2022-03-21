const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({

name: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase: true,
}, 
    
    fullName: {
        type:String,
        required:true,

    },

        // example `Indian Institute of Technology, Hyderabad`},

 logoLink: {

     type:String,
     required:true,
     match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,'Enter correct url!']

    }, 
    isDeleted: {
        type:Boolean, 
        default: false
    } 
},{timestamps:true})



module.exports = mongoose.model('college', collegeSchema);


//   https://functionup.s3.ap-south-1.amazonaws.com/colleges/svnit.jpg