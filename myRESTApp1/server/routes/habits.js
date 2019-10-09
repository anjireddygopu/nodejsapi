"use strict";
const pool = require('./database.js');
const habits = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from habits');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    try {
      console.log(req.params.id);
      const results = await pool.query('select * from habits where habit_id=?', [req.params.id]);
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
      const results = await pool.query("Insert into habits(habit_name,created_by,active) VALUES('" + req.body.habit_name + "','" + req.body.created_by + "','" + req.body.active + "')");
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body);
      const results = await pool.query('update habits set habit_name=?,updated_by=?,updated_on=?,active=? where habit_id=?', [req.body.habit_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.habit_id]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (req, res) => {
    console.log(req.params.id);
    const results = await pool.query('DELETE FROM  habits WHERE `habit_id`=?', [req.params.habit_id], function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    });
  }
};
module.exports = habits;