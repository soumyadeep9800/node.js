const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const personSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    username:{
        required:true,
        type: String
    },
    password:{
        required:true,
        type: String
    }
});

personSchema.pre('save', async function(next){
    const person=this;
    if(!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt= await bcrypt.genSalt(10);
        const hash_Password= await bcrypt.hash(person.password,salt);
        person.password=hash_Password;
        next();
    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMathch=await bcrypt.compare(candidatePassword,this.password);
        return isMathch;
    } catch (error) {
        throw error;
    }
}
// prince ----> bjcbwbcibcwbncjncnecjc(prince conver hashpassword)
// then when i login put wromg password suppose
// princee
//the what actually happen
// bjcbwbcibcwbncjncnecjc---> extract salt
// salt+princee(put password)--->hash--->compare hash

//create model
const person=mongoose.model('person',personSchema);
module.exports=person;
