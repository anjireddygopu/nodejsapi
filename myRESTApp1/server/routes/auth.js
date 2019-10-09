const pool = require('./database.js');
var jwt = require('jwt-simple');
 
var auth = {
  login:async (req, res)=>{
    console.log("reqest alkcpocl90-elp");
  var username = req.body.username ||'' ;
  var password = req.body.password ||'';
  try{
      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
      else{
  // Fire as are valid query to your DB and check if the credential
  const results=await pool.query('select * from tm_satellite_center where  contact_no1=?', [req.body.username]);
  // const dbdata=JSON.stringify(results);
  // console.log(dbdata);
  // @ts-ignore
  if(results.length>0){
      for(var i in results){
        if(results[i].password==password){
        var dbUserObj = auth.validate(username, password);
        if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
      }
  
    if (dbUserObj) {
  
      // If authentication is success, we will generate a token
      // and dispatch it to the client
  
      res.json(genToken(dbUserObj));
    }
   }
   else{
     res.json({
       "status":403,
       "message":"Password incorrect"
     })
   }
   }
  }
   else{
     res.json({
       "status":405,
       "message":"Username incorrect"
     })
   }
  }
   }
   catch(error){
     throw new Error(error);
   }
  },
  
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
     name: 'arvind',
     role: 'admin',
     username:username
    };
  
    return dbUserObj;
  },
  
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username:username
    };
  
    return dbUserObj;
  },
  logoutget:function (req, res) {
    req.session.destroy(function(err){
      if(err){ 
        console.log(); 
        res.json({
              "status":406,
              "message":"logout failed"
            })
      }  
      else  
      {  
        res.json({
              "status":200,
              "message":"successfully logout"
            })
      }  
  });  
  },
  forgetpassword:async(req,res)=>{
    console.log(req.body);
    try{
      const results=await pool.query('update tm_satellite_center set password=? where contact_no1=? or email_id=?', [req.body.r_password,req.body.r_mobile,req.body.r_email]);
      res.end(JSON.stringify(results));
    }
    catch(error){
      throw new Error(error);
    }
    
  }
  }
  
  function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  
  return {
  
      "status":200,
      "message":"success",
    token: token,
    expires: expires,
    user: user
  };
  }
  
  function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
  }
  
  module.exports = auth;