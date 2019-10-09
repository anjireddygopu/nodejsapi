'use strict';
const pool = require('./database.js');
var patient_immunization_txn_dtls1= {
  getAll:async (req, res)=>{
    try{
      const postData = {};
      var recordsList = [];
      var recorddata={};
      const results = await pool.query('select * from patient_immunization_txn where medical_record_no= ?',[req.params.mrno]);
      Object.keys(results).forEach(function(key) {
      var recordlist={};  
      var row = results[key];
      recorddata.pa_i_t_id=row.pa_i_t_id;
      recorddata.medical_record_no=row.medical_record_no;
      recorddata.notes=row.notes;
      }) 
      //recorddata.push(recordlist);
      postData.patient_immunization_txn = recorddata;
      try{
        postData.patient_immunization_txn_dtls = recorddata;
      console.log(recorddata.pa_i_t_id);
      const results1 = await pool.query('select dtls.*,im.immunization_name from  patient_immunization_txn_dtls dtls,immunization im where im.immunization_id=dtls.immunization_id and pa_i_t_id=?',[recorddata.pa_i_t_id]);
      Object.keys(results1).forEach(function(key1) {
      var datarecord = {};
      var row1=results1[key1];
      datarecord.id =row1.id;
      datarecord.pa_i_t_id=row1.pa_i_t_id;
      datarecord.immunization_name=row1.immunization_name;
      datarecord.immunization_id=row1.immunization_id;
      datarecord.immunization_date=row1.immunization_date;
      datarecord.immunization_route=row1.immunization_route;
      datarecord.administration_site=row1.administration_site;
      datarecord.dose_amount=row1.dose_amount;
      datarecord.dose_unit=row1.dose_unit;
      datarecord.dose_form=row1.dose_form;
      recordsList.push(datarecord);
      });
      postData.patient_immunization_txn_dtls = recordsList;
      res.end(JSON.stringify(postData));
    }
    catch(err){
      throw new Error(err);
    }
  }catch(err){
      throw new Error(err);
    }
  },
     create: async(req, res)=>{
        try{
        const results=await pool.query("Insert into patient_immunization_txn(medical_record_no,notes,created_by,created_on) VALUES('"+req.body.MRNo+"','"+req.body.notes+"','"+req.body.created_by+"','"+req.body.created_on+"')");
     // @ts-ignore
     console.log(results.insertId);
     // @ts-ignore
     var txn_id = results.insertId;
     try{
      const results=await pool.query("Insert into patient_immunization_txn_dtls(pa_i_t_id,immunization_id,immunization_date,immunization_route,administration_site,dose_amount,\
           dose_unit,dose_form,created_by,created_on) VALUES(?,?,?,?,?,?,?,?,?,?)",[txn_id,req.body.immunization_id,req.body.immunization_date,req.body.immunization_route,req.body.administration_site,req.body.dose_amount,req.body.dose_unit,req.body.dose_form,req.body.created_by,req.body.created_on]);
           res.end(JSON.stringify(results));
         }catch(error){
           throw new Error(error);
         }    
     }catch(error)
     {
       throw new Error(error);
     }
    },
    create1:async (req,res)=>{
      try{
        const results=await pool.query("Insert into patient_immunization_txn(medical_record_no,notes,created_by,created_on) VALUES('"+req.body.MRNo+"','"+req.body.notes+"','"+req.body.created_by+"','"+req.body.created_on+"')");
        res.end(JSON.stringify(results));
      }catch(error)
      {
        throw new Error(error);
      }

    },
     update:async (req, res)=> {
       try{
      const  results=await pool.query("update patient_immunization_txn set notes=? where pa_i_t_id=?",[req.body.notes,req.body.pa_i_t_id]);
      res.end(JSON.stringify(results)); 
      console.log(req.body.pa_i_t_id);
      var pa_i_t_id=req.body.pa_i_t_id;
      try{
      const  results=await pool.query("Insert into patient_immunization_txn_dtls(pa_i_t_id,immunization_id,immunization_date,immunization_route,administration_site,dose_amount,\
        dose_unit,dose_form,created_by,created_on) VALUES(?,?,?,?,?,?,?,?,?,?)",[pa_i_t_id,req.body.immunization_id,req.body.immunization_date,req.body.immunization_route,req.body.administration_site,req.body.dose_amount,req.body.dose_unit,req.body.dose_form,req.body.created_by,req.body.created_on]);
      res.end(JSON.stringify(results));
      }catch(error){
        throw new Error(error);
      }
    }catch(error){
      throw new Error(error);
    }
  },
  update1:async (req, res)=> {
    try{
    console.log(req.body.notes);
   const results=await pool.query("update  patient_immunization_txn set notes=?,updated_by=?,updated_on=? where pa_i_t_id=?",[req.body.notes,req.body.updated_by,req.body.updated_on,req.body.pa_i_t_id]);
   res.end(JSON.stringify(results));    
   try{
   const  results=await pool.query("update patient_immunization_txn_dtls set immunization_id=?,immunization_date=?,immunization_route=?,administration_site=?,dose_amount=?,dose_unit=?,dose_form=?,updated_by=?,updated_on=? where id=?",[req.body.immunization_id,req.body.immunization_date,req.body.immunization_route,req.body.administration_site,req.body.dose_amount,req.body.dose_unit,req.body.dose_form,req.body.updated_by,req.body.updated_on,req.body.id]);
   res.end(JSON.stringify(results));
   }catch(error){
     throw new Error(error);
   }
  }catch(error){
    throw new Error(error);
  }
 },

delete:async (req,res)=>{
      try{
      console.log(req.params.id);
      const results=await pool.query("delete from patient_immunization_txn_dtls where id=?",[req.params.id]);
      res.end(JSON.stringify(results));
      }catch(error){
        throw new Error(error);
      }
    }
   }
     module.exports = patient_immunization_txn_dtls1;

    