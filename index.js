// const express = require("express")
// const zod = require('zod');
// const port = 3000
// const app = express();

// // app.use(express.json());
// // const schema = zod.array(zod.number());
// // const schema = zod.object({
// //     email: zod.string().email(),
// //     password: zod.string().min(8)
// // })


// // app.post("/health-checkup",function(req,res){
// //     const kidneys = req.body.kidneys;
// //     const response = schema.safeParse(kidneys);
// //     res.send({
// //         response
// //     })
// // })



// // app.post("/login",function(req,res){
// //     const input = req.body;
// //     console.log(input);
// //     const response = schema.safeParse(input);
// //     if(!response.success){
// //         res.status(404).send({
// //             msg:"Your input is invalid"
// //         })
// //     }
// //     else{
// //         res.status(200).send("Okay Done")
// //     }
// // })

// // Assignment 2: Find the average time your server is taking to handle requests

// var totalTime = 0;
// var totalRequest = 0;
// var startTime = 0;
// function avgTime(req,res,next){
//     startTime = Date.now();
//     // console.log("Inside middleWare");
//     // res.send(startTime.toString());
//     next();
// }

// app.get("/",avgTime,function(req,res){
//     var sum = 0;
//     for(let i=0;i<1000000;i++){
//         sum = sum+i;
//     }
//     console.log("sum is "+sum);
//     var endTime = Date.now();
//     var requestTime = endTime - startTime;
//     totalRequest++;
//     totalTime += requestTime;
//     var averageTime = totalTime / totalRequest;
//     res.send('total number of request '+totalRequest + 'Request time: '+ requestTime + 'Average Time: '+averageTime +' ms');
// })

// app.listen(3000,function(){
//     console.log("Server is running");
// });


const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username === username) {
      if (ALL_USERS[i].password === password) {
        return true;
      }
    }
  }
  return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    var newUserArray = ALL_USERS.filter(
      (userObj) => userObj.username !== username,
    );
    res.json({
      users: newUserArray,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);

