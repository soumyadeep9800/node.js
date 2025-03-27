const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken}=require('../jwt');
const { findById } = require('../models/Menu');
router.post('/signup',async(req,res)=>{
    try {
        const data=req.body // Assuming the request body contains the person data
        console.log(data);
        const newPerson=new Person(data);
        console.log(newPerson);//create a new person document using the mongoose model
        const savePerson = await newPerson.save();//save the new person in the database
        console.log(savePerson);

        const payload={
            id:savePerson.id,
            username:savePerson.username
        }
        const token=generateToken(payload);
        console.log("token is: ",token);

        res.status(200).json({ user: savePerson, token });
    } catch (error) {
        console.log('failed to save person');
        res.status(500).json({error:'internal server error'});
    }
});
//login
router.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        //find user
        const user=await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
           return res.status(401).json({error:'invalid username or password'});
        }
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'});
    }
    
});
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const data=await Person.find();
        console.log('data fatched');
        res.status(200).json(data);
    } catch (error) {
        console.log('failed to fatch person');
        res.status(500).json({error:'internal server error'});
    }
});
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
   try {
    const userDate=req.user;
    console.log(userDate);

    const userID=userDate.id;
    const user=await Person.findById(userID);
    res.status(200).json({user});
   } catch (error) {
    console.log(error);
    res.status(500).json({error:'internal server error'});
   }
});

router.get('/:work',async(req,res)=>{
    try {
        const workType=req.params.work;
        if(workType==='chef'||workType==='manager'||workType==='waiter'){
            const response=await Person.find({work:workType});
            console.log('data fatched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid work type'});
        }
    } catch (error) {
        console.log('failed to fatch data');
        res.status(500).json({error:'internal server error'});
    }
});

router.put('/:id',async(req,res)=>{
    try {
        const personID=req.params.id;//Extract the id from the URL
        const updatepersonData=req.body; //Contains the updated person data sent in the request.
        const response=await Person.findByIdAndUpdate(personID,updatepersonData,{
            new:true, //Ensures the updated document is returned.
            runValidators:true//Runs Mongoose schema validation.
        });
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log('data not update');
        res.status(500).json({error:'internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const personID=req.params.id;
        const response=await Person.findByIdAndDelete(personID);
        if(!response){
            return res.status(404).json({error:'person not found'});
        } 
        console.log('succesfully delete');
        res.status(200).json({message:'person deleted'});
    } catch (error) {
        console.log('not deleted');
        res.status(500).json({error:'internal server error'});
    }
})


module.exports=router;