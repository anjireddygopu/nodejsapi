'use strict';
const pool = require('./database.js');
var immunization= {
    
     getAll: async(req, res)=>{
       try{
       const results=await  pool.query('select immunization_id,immunization_name,active from  immunization');
            res.end(JSON.stringify(results));
          }catch(error){
            throw new Error(error);
          }
     },
    
     getOne:async(req, res)=>{
       try{
        const results= await pool.query('select immunization_id,immunization_name,active from  immunization where immunization_id=?', [req.params.id]);
        res.end(JSON.stringify(results));
      }catch(error){
        throw new Error(error);
      }
     },
    
     create: async(req, res)=>{
       try{
       const results= await pool.query("insert into immunization(immunization_name,active,created_by,created_on) VALUES(?,?,?,?)",[req.body.immunization_name,req.body.active,req.body.created_by,req.body.created_on]);
        res.end(JSON.stringify(results));
        }catch(error){
          throw new Error(error);
        }
     },
    
     update: async(req, res)=>{
       try{
         console.log(req.body.active);
        const results=await pool.query('UPDATE immunization SET immunization_name=?,updated_by=?,updated_on=?,active=? where immunization_id=?',[req.body.immunization_name,req.body.updated_by,req.body.updated_on,req.body.active,req.body.immunization_id]);
            res.end(JSON.stringify(results));
          }catch(error){
            throw new Error(error);
          }
     },
   };
    
  
   module.exports = immunization;