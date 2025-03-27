// function add(a,b){
//     return a+b;
// }
// var result=add(2,5);
// console.log(result);

// var add=function(a,b){return a+b;}
// console.log(add(5,8));

// var add=(a,b)=>{
//     return a+b;
// }
// console.log(add(5,8));

// callback function

// var callback=function(a,b,print){
//     console.log(a+b);
//     print();
// }
// callback(10,12,()=>console.log("hello jii"))
// callback(10,12,function(){
//     console.log("hello ji")
// })

// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user);
// console.log(os.hostname());

// fs.appendFile('gretting.txt','hi '+user.username+'!\n',()=>{
//     console.log("file is created");
// });


// var _=require('lodash');
// var data=["abc","abc",1,1,2,3,3,6]
// var filter=_.uniq(data);
// console.log(filter);
// console.log(_.isString("hello"));


// const notes=require('./notes.js');
// var xx=notes.x;
// console.log(xx);


// let jsonS1 = '{"name": "Mohit", "age": 30}';
// let jsonObj = JSON.parse(jsonS1);
// console.log(jsonObj.name);

// let obj = {name: "Mohit", age: 30};
// let jsonS= JSON.stringify(obj);

// console.log(jsonS);