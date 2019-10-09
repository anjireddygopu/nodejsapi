'use strict';
const pool = require('./database.js');
var Districts = {
 
  getAll: async (req, res)=> {
  try{
    const results= await pool.query('select district_id,district_name,active from districts');
    res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
  },
 
  getOne: async  (req, res)=> {
    try{
    const results=await pool.query('select district_id,district_name,state_id,country_id,active from districts where district_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error)
    }
  
  },
  getTwo: async (req, res)=> {
    try{
    const results= await pool.query('select district_id,district_name,state_id from districts where district_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
  getThree: async (req, res)=> {
    try{
    const results=await pool.query('select district_id,district_name from districts where state_id=?', [req.params.state_id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
  create:async (req, res)=> {
    try{
     const results=await pool.query('INSERT INTO districts(district_name,country_id,state_id,created_by,created_on,active) values(?,?,?,?,?,?)',[req.body.district_name,req.body.country_id,req.body.state_id,req.body.created_by,req.body.created_on,req.body.active]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 
  update: async (req, res)=> {
    try{
     const results=await pool.query('UPDATE districts SET district_name=?,updated_by=?,updated_on=?,country_id=?,state_id=?,active=? where district_id=?', [req.body.district_name,req.body.updated_by,req.body.updated_on,req.body.country_id,req.body.state_id,req.body.active,req.body.district_id]);
     res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
   },
};
 
module.exports = Districts