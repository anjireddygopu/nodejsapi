'use strict';
const pool = require('./database.js');
var countries = {
 getAll: async(req, res)=>{
    try{
   const results= await pool.query('select country_id,country_name,active from countries');
    res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
  },
 
  getOne:async (req, res)=>{
    try{
    const results=await pool.query('select country_id,country_name,active from countries where country_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 
  create:async(req, res)=>{
    try{
    const results=await pool.query('INSERT INTO countries(country_name,created_by,created_on,active) values(?,?,?,?)',[req.body.country_name,req.body.created_by,req.body.created_on,req.body.active]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 
  update:async(req, res)=>{
    try{
     const results=await pool.query('UPDATE countries SET country_name=?,updated_by=?,updated_on=?,active=? where country_id=?', [req.body.country_name,req.body.updated_by, req.body.updated_on,req.body.active,req.body.country_id]);
     res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
   },
};
 
module.exports = countries;