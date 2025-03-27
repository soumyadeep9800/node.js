const mongoose=require('mongoose');

const menuItem=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    id_drink:{
        type:Boolean,
        default:false
    }
})
const menu=mongoose.model('menu',menuItem);
module.exports=menu;