"use strict";
var pool = require('./database.js');
var patients= {  
     getAll: async (req, res)=> {
       try{
     const results=await pool.query('select record_no, first_name,last_name,date_format(date_of_birth,"%d-%m-%y") as date_of_birth,mobile_number,emergency_name from  patient_registration');
            res.end(JSON.stringify(results));
          }
          catch(err) {
            throw new Error(err);
        }
     },
     getAll1: async (req, res)=> {
      try{
    const results=await pool.query('select * from  patient_case_details');
           res.end(JSON.stringify(results));
         }
         catch(err) {
           throw new Error(err);
       }
    },
     getOne: async (req, res)=> {
         try{
     const results=await pool.query('select  * from patient_registration where record_no=?', [req.params.id]);
        res.end(JSON.stringify(results));
      }
      catch(err) {
        throw new Error(err);
    }
     },
     create:async (req, res) =>{
      try{
       var postData  = req.body;
    const results=await   pool.query('INSERT INTO patient_registration set ?',postData);
       res.end(JSON.stringify(results));
      // const results1=await   pool.query('INSERT INTO  patient_case_details(mrno) values ("'+postData.record_no+'")');
       }
       catch(err) {
         throw new Error(err);
     }
    },
     createcase:async (req, res) =>{
      try{
       var mrno  = req.body.mrno;
       var episodeid;
       var visitid;
       var posted;
       var postData={};
       const results=await  pool.query('select max(episode_id) as episode_id,max(visit_id) as visit_id from patient_case_details where mrno =?',mrno);
       console.log(results);
          // @ts-ignore
     
        // @ts-ignore
        for(var i in results){
          console.log(results[i].episode_id);
        if(results[i].episode_id==null){
          // @ts-ignore
          episodeid=0o1;
          // @ts-ignore
          visitid=0o1;
          posted="N";
          const results1=await pool.query("insert into patient_case_details(mrno,episode_id,visit_id,posted) values('"+mrno+"','"+episodeid+"','"+visitid+"','"+posted+"')");
          var data1= JSON.stringify(results1);
          const results2=await pool.query("select * from patient_case_details  where mrno=? and episode_id=? and visit_id=?",[mrno,episodeid,visitid] );
          var data2=(results2);
            postData.patient_case_details=data2;
        }
        else{
          // @ts-ignore
          episodeid=results[i].episode_id+1;
          // @ts-ignore
          visitid=0o1;
          posted="N";
          const results2=await pool.query("insert into patient_case_details(mrno,episode_id,visit_id,posted) values('"+mrno+"','"+episodeid+"','"+visitid+"','"+posted+"')");
        var data1= JSON.stringify(results2);
        const results3=await pool.query("select * from patient_case_details  where mrno=? and episode_id=? and visit_id=?",[mrno,episodeid,visitid] );
        var data2=(results3);
          postData.patient_case_details=data2;
    
        }
      }
      res.end(JSON.stringify(postData));
       }
       catch(err) {
         throw new Error(err);
     }
    },
    createvisit:async (req, res) =>{
      try{
       var mrno  = req.body.mrno;
       var episodeid;
       var visitid;
       var posted;
       var postData={};
       const results=await  pool.query('select max(episode_id) as episode_id,max(visit_id) as visit_id from patient_case_details where mrno =?',mrno);
       console.log(results);
          // @ts-ignore
     
        // @ts-ignore
        for(var i in results){
          console.log(results[i].episode_id);
        if(results[i].episode_id!==null){
          episodeid=results[i].episode_id;
          visitid=results[i].visit_id+1;
          posted="N";
          const results2=await pool.query("insert into patient_case_details(mrno,episode_id,visit_id,posted) values('"+mrno+"','"+episodeid+"','"+visitid+"','"+posted+"')");
        const results3=await pool.query("select * from patient_case_details  where mrno=? and episode_id=? and visit_id=?",[mrno,episodeid,visitid] );
        var data2=(results3);
        postData.patient_case_details=data2;   
      }
        }
        res.end(JSON.stringify(postData));
      }
       catch(err) {
         throw new Error(err);
     }
    },
     update: async (req, res)=> {
       try{
      const results=await  pool.query('update patient_registration set  first_name=?,last_name=?,gender=?,date_of_birth=?,patient_age=?, marital_status=?,blood_group=?,language=?,aadhar_number=?,occupation=?,religion=?,nationality=?,income_group=?,income_group=?,address_line_1=?,address_line_2=?,address_line_3=?,email_id=?,mobile_number=?,phone_number=?,country=?,state=?,district=?,city=?,pincode=?,emergency_name=?,relationship=?, emergency_phone_number=?,emergency_mobile_number=?,updated_by=?,updated_on=? where record_no =?',  [req.body.first_name,req.body.last_name,req.body.gender,req.body.date_of_birth,req.body.patient_age, req.body.marital_status,req.body.blood_group,req.body.language,req.body.aadhar_number,req.body.occupation,req.body.religion,req.body.nationality,req.body.income_group,req.body.income_group,req.body.address_line_1,req.body.address_line_2,req.body.address_line_3,req.body.email_id,req.body.mobile_number,req.body.phone_number,req.body.country,req.body.state,req.body.district,req.body.city,req.body.pincode,req.body.emergency_name,req.body.relationship, req.body.emergency_phone_number,req.body.emergency_mobile_number,req.body.updated_by,req.body.updated_on ,req.body.record_no]);
            res.end(JSON.stringify(results));
          }
          catch(err) {
            throw new Error(err);
        }
     }
    }
   module.exports =patients;