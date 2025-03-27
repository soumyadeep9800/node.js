const express=require('express');
const app=express();
const port=3000;
const db=require('./db.js');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); //req.body
//app.use(express.json());
// const passport=require('./auth.js');

//midleware function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();//move to next phase
}
app.use(logRequest);


app.get('/',function(req,res){
    res.send('welcome to hotel');
});

// app.use(passport.initialize());
// const localauthmiddleware=passport.authenticate('local',{session:false});



const personRouter=require('./Routes/personRoutes.js');
app.use('/person',personRouter);

const menuItem=require('./Routes/menuRouter.js');
app.use('/menu',menuItem);

// const gaurdItem=require('./Routes/gaurdRouter.js');
// app.use('/gaurd',gaurdItem);

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});






