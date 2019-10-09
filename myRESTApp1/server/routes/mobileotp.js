var http = require("http");
var cors = require('cors');
const Nexmo = require('nexmo');
const pool = require('./database.js');
var id;
var mobileotp={
create:async function(req,res){ 
    var code=req.body.mobilecode;
  var mn=req.body.nnumber;
  var mobilenumber=code+""+mn;
  console.log(mobilenumber);
  try{
  const results=await pool.query('select  * from tm_satellite_center where contact_no1=?', [req.body.nnumber]);
  console.log(results);
  // @ts-ignore
  if(results.length>0){
  for(var i in results){
    if(results[i].contact_no1==mn){
  var otpGenerator = require('otp-generator');
  var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false, });
  console.log(otp);
 const nexmo = new Nexmo({
    apiKey:'b66d55fb',
    apiSecret: 'DhBFEH7Kvet2NyIK'
}); 
var codeMsg= "Your Verification code is "+ otp +" ";
console.log(codeMsg);
nexmo.message.sendSms(
   'Your Number', mobilenumber,codeMsg,{ type : 'unicode'},
   (err,responseData)=>{
       if(err){
           console.log(err);
       }else{
           console.dir(responseData);
       }
   }
);
pool.query('insert into mobileotp(m_otp) values("'+otp+'")', function (error, results, fields) {
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
        "message":"please enter existing mobile number"
      })
}
}
}
else{
    res.json({
        "status":405,
        "message":"mobile number doesnot exist"
      })
}
}
catch(error){
    throw new Error(error);
  }
},
get:function (req, res) {
  pool.query('select m_otp from mobileotp where m_id=?',[id], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
   var data = [].concat(results);
 });

}

};
module.exports = mobileotp;