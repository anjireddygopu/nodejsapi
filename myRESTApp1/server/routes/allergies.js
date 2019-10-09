"use strict";
const pool = require('./database.js');
const allergies = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from allergies');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    try {
      console.log(req.params.id);
      const results = await pool.query('select * from allergies where allergy_id=?', [req.params.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (req, res) => {
    try {
      var postData = req.body;
      console.log(req.body);
      console.log(postData);
      const results = await pool.query("Insert into allergies(allergy_name,created_by,active) VALUES('" + req.body.allergy_name + "','" + req.body.created_by + "','" + req.body.active + "')");
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body);
      const results = pool.query('update allergies set allergy_name=?,updated_by=?,updated_on=?,active=? where allergy_id=?', [req.body.allergy_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.allergy_id]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: (req, res) => {
    console.log(req.params.id);
    pool.query('DELETE FROM  allergies WHERE `allergy_id`=?', [req.params.allergy_id], function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    });
  }
};
module.exports = allergies;