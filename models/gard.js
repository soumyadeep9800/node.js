const mongoose=require('mongoose');

const gardItem=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true,
        unique:true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: { 
            validator: function(v) { 
                return /^[0-9]{10}$/.test(v); // Ensures only 10-digit numbers 
            } 
        }
    }
})

const gaurd=mongoose.model('gaurd',gardItem);
module.exports=gaurd;