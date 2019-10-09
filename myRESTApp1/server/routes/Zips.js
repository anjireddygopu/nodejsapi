'use strict';
const pool = require('./database.js');
const Zips = {
  getAll: async(req,res)=>{
    try {
      const results =await pool.query('select zc.zip_code_id,zc.zip_code,zc.active,ts.town_name from zip_codes as zc ,towns  ts where zc.town_id=ts.town_id');
      res.end(JSON.stringify(results));
       } catch(error) {
      throw new Error(error);
     }
  },
  getOne:async(req, res)=>{
    try {
    const results =await pool.query('select zip_code_id,zip_code,town_id,district_id,state_id,country_id,active from zip_codes where zip_code_id=?', [req.params.id]);
      console.log(results);
      res.end(JSON.stringify(results));
       } catch(error) {
      throw new Error(error);
     }
  },
  getTwo:async(req, res)=> {
    try{
   const results=await pool.query('select town_id,town_name,district_id,state_id,country_id from towns where town_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }
  catch(error) {
    throw new Error(error);
   }
  },
  getThree:async(req, res)=> {
   try{
    const results=await pool.query('select zip_code_id,zip_code from zip_codes where town_id=?', [req.params.id]);
    res.end(JSON.stringify(results));
  }
  catch(error) {
    throw new Error(error);
   }
  },
  create:async(req, res)=> {
    try {
      const results =await pool.query('INSERT INTO zip_codes(zip_code,town_id,country_id,state_id,district_id,created_by,created_on,active) values(?,?,?,?,?,?,?,?)',[req.body.zip_code,req.body.town_id,req.body.country_id,req.body.state_id,req.body.district_id,req.body.created_by,req.body.created_on,req.body.active]);
      res.end(JSON.stringify(results));
    }catch(error) {
      throw new Error(error);
     }
  },
  update:async (req, res)=> {
    try{
    const results =await pool.query('UPDATE zip_codes SET zip_code=?,updated_by=?,updated_on=?,country_id=?,state_id=?,district_id=?,town_id=?,active=? where zip_code_id=?', [req.body.zip_code,req.body.updated_by,req.body.updated_on,req.body.country_id,req.body.state_id,req.body.district_id,req.body.town_id,req.body.active,req.body.zip_code_id]);
    res.end(JSON.stringify(results));  
  }catch(error) {
    throw new Error(error);
   }
   },

};
module.exports = Zips;