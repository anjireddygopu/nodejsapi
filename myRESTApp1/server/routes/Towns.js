'use strict';
const pool = require('./database.js');
var Towns = {
 
  getAll: async(req, res)=>{
  try{
    const results= await pool.query('select town_id,town_name,active from towns');
    res.end(JSON.stringify(results));
    }catch(error){
    throw new Error(error);
  }
  },
 
  getOne:async (req, res)=> {
    try{
    const results=await pool.query('select town_id,town_name,district_id,state_id,country_id,active from towns where town_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
  getTwo:async  (req, res)=> {
    try{
     const results=await pool.query('select town_id,town_name from towns where district_id=?', [req.params.district_id]);
      res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },

  create: async (req, res)=> {
    try{
  const results= await pool.query('INSERT INTO towns(town_name,country_id,state_id,district_id,created_by,created_on,active) values(?,?,?,?,?,?,?)',[req.body.town_name,req.body.country_id,req.body.state_id,req.body.district_id,req.body.created_by,req.body.created_on,req.body.active]);
    res.end(JSON.stringify(results));
  }catch(error){
    throw new Error(error);
  }
  },
 
  update:async (req, res)=> {
    try{
     const results=await pool.query('UPDATE towns SET town_name=?,updated_by=?,updated_on=?,country_id=?,state_id=?,district_id=?,active=? where town_id=?', [req.body.town_name,req.body.updated_by,req.body.updated_on,req.body.country_id,req.body.state_id,req.body.district_id,req.body.active,req.body.town_id]);
     res.end(JSON.stringify(results));
    }catch(error){
      throw new Error(error);
    }
   },
};
module.exports = Towns;