var http = require("http");
var cors = require('cors');
const pool = require('./database.js');
var otpGenerator = require('otp-generator');
var id;
var emailotp={
create:async function(req,res){
        var mail=req.body.email;
        console.log(mail);
        try{
            const results=await pool.query('select  * from tm_satellite_center where email_id=?', [req.body.email]);
            console.log(results);
            // @ts-ignore
            if(results.length>0){
            for(var i in results){
              if(results[i].email_id==mail){
                var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false, });
                console.log(otp);
                var nodemailer = require('nodemailer');
              
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'cybermatetelehealth@gmail.com',
                  pass: 'admin143225'
                }
              }); 
              var mailOptions = {
                from: 'cybermatetelehealth@gmail.com',
                to: mail,
                subject: 'Sending Email using Node.js',
                text: 'Your one time password is:'+otp
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              pool.query('insert into poc(otp) values("'+otp+'")', function (error, results, fields) {
                if (error) throw error;
                id=results.insertId;
              });
          res.json({
              "status":200,
              "message":"success"
            })
          }
          else{
              res.json({
                  "status":405,
                  "message":"please enter existing email id"
                })
          }
          }
          }
          else{
              res.json({
                  "status":405,
                  "message":"email doesnot exist"
                })
          }
          }
          catch(error){
              throw new Error(error);
            }
  
    },
      
      get:function (req, res) {
        pool.query('select otp from poc where id=?',[id], function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results));
        var data = [].concat(results);
       });
    },
      
      getd:function (req, res) {
        pool.query('insert into password(pwd) values("'+req.body.password+'")', function (error, results, fields) {
         if (error) throw error;
         res.end(JSON.stringify(results));
        var data = [].concat(results);
       });
      }
      
};
module.exports = emailotp;