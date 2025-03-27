// const passport=require('passport');
// const localStrategy=require('passport-local').Strategy;
// const Person=require('./models/Person.js');



// //authencation logic
// passport.use(new localStrategy(async(USERNAME,password,done)=>{
//     //logic
//     try {
//         // console.log('Received credentials: ',USERNAME,password);
//         const user=await Person.findOne({username:USERNAME});
//         if(!user){
//             return done(null,false,{message:'incorect username'});
//         }
//         const isPasswordMatch=await user.comparePassword(password);
//         if(isPasswordMatch){
//             return done(null,user);
//         }else{
//             return done(null,false,{message:'incorect password.'});
//         }
//     } catch (error) {
//         return done(error);
//     }
// }));

// module.exports=passport;