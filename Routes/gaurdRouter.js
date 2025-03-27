const express=require('express');
const router=express.Router();
const GaurdItem=require('./../models/gard.js');

router.post('/',async(req,res)=>{
    try {
        const data=req.body
        const newgaurd=new GaurdItem(data);
        const savegaurd=await newgaurd.save();
        console.log('gard saved succesfully');
        res.status(200).json(savegaurd);
    } catch (error) {
        console.log('failed save gurd');
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/',async(req,res)=>{
   try {
    const data=await GaurdItem.find();
    console.log('data fatched succesfully');
    res.status(200).json(data);
   } catch (error) {
    console.log('failed to fatche gaurd');
    res.status(500).json({error:'internal server error'});
   }
});

module.exports=router;