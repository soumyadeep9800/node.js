const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/Menu');

router.post('/',async(req,res)=>{
    try {
        const data=req.body
        const newMenu=new MenuItem(data);
        const saveMenu= await newMenu.save();
        console.log('menu saved succesfully');
        res.status(200).json(saveMenu);
    } catch (error) {
        console.log('failed to save menu');
        res.status(500).json({error:'internal server error'});
    }
});

router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find();
        console.log('data fatched');
        res.status(200).json(data);
    } catch (error) {
        console.log('failed to fatch menu');
        res.status(500).json({error:'internal server error'})
    }
});

router.get('/:taste',async(req,res)=>{
    try {
       const tast=req.params.taste;
       if(tast==='sweet'||tast==='spicy'||tast==='sour'){
            const data=await MenuItem.find({taste:tast});
            console.log('data fatched');
            res.status(200).json(data);
       }else{
            res.status(404).json({error:'invalid taste'});
       }
    } catch (error) {
            console.log('failed to fatch');
            res.status(500).json({error:'internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
   try {
    const manu_id=req.params.id;
    const response=await MenuItem.findByIdAndDelete(manu_id);
    if(!response){
        console.log('menu not found');
        res.status(404).json({error:'menu not found'});
    }
    console.log('delete succesfully');
    res.status(200).json({message:'menu delete succesfully'});
   } catch (error) {
    console.log('menu not delete');
    res.status(500).json({error:'internal server error'});
   }
});

router.put('/:id',async(req,res)=>{
   try {
    const menu_id=req.params.id;
    const new_menu_data=req.body;
    const response=await MenuItem.findByIdAndUpdate(menu_id,new_menu_data,{
        new:true,
        runValidators:true
    });
    if(!response){
        console.log('menu can not find');
        res.status(404).json({error:'menu not present'});
    }
    console.log('menu updated');
    res.status(200).json(response);
   } catch (error) {
    console.log('menu not update');
    res.status(500).json({error:'internal server error'})
   }
});

module.exports=router;