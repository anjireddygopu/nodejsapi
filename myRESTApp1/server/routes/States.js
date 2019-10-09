'use strict';
const pool = require('./database.js');
var States = {
 getAll: async (req, res)=> {
   try{
  const results=await pool.query('select state_id,state_name,country_id,active from states');
    res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
  },
 
  getOne: async (req, res)=>{
    try{
    const results=await pool.query('select state_id,state_name,country_id,active from states where state_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
  getTwo:async(req, res)=>{
    try{
    const results =await pool.query('select state_id,state_name,country_id from states where country_id=?', [req.params.country_id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 create:async (req, res)=>{
   try{
    const results=await pool.query('INSERT INTO states(state_name,created_by,created_on,country_id,active) values(?,?,?,?,?)',[req.body.state_name,req.body.created_by,req.body.created_on,req.body.country_id,req.body.active]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 
  update:async (req, res)=>{
    try{
     const results=await pool.query('UPDATE states SET state_name=?,updated_by=?,updated_on=?,country_id=?,active=? where state_id=?', [req.body.state_name,req.body.updated_by, req.body.updated_on,req.body.country_id,req.body.active,req.body.state_id]);
     res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
   },
};
 
module.exports = States;