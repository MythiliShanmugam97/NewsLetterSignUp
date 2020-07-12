const express =require("express");
const bodyParser =require ("body-parser");
const request = require("request");
const https =require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){

  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;

  // console.log(email);


  var data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
    ]
  }

  var jsonData = JSON.stringify(data);

  var url="https://us10.api.mailchimp.com/3.0/lists/a1603dbeeb/";
  var options={
    method:"POST",
    auth:"Mythili:60101292099cdd9d057911ef39ca0943-us10"
  }
const request= https.request(url,options,function(response){
  console.log(response);
  var statusCode=Number(response.statusCode);
  response.on('data',function(data) {
  var data1=JSON.parse(data);
  console.log(data1);
  if (statusCode==200) {
    res.sendFile(__dirname+"/success.html");
  } else {
    res.sendFile(__dirname+"/failure.html");
  }
  });
});

request.write(jsonData);
request.end();
}

);
app.listen(process.env.PORT ||4003,function () {
  console.log("Server started at port 4003");
});
