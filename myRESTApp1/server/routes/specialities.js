var pool = require('./database.js');
var specialities = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from  specialities');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    var postData = req.body;
    console.log(req.body.id);
    try {
      const results = await pool.query('select * from specialities where specialization_id=?', [req.params.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
  create: async (req, res) => {
    var postData = req.body;
    try {
      const results = await pool.query("Insert into specialities(specialization_name,created_by,active) VALUES('" + req.body.specialities_name + "','" + req.body.created_by + "','" + req.body.active + "')");
      console.log(results);
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
  update: async (req, res) => {
    console.log(req.body);
    try {
      const results = await pool.query('UPDATE specialities SET  specialization_name=?, updated_by=?,updated_on=?, active=? where specialization_id=?', [req.body.specialization_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.specialization_id]);
      console.log(results);
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
  delete: async (req, res) => {
    console.log(req.body);
    try {
      const results = await pool.query('DELETE FROM specialities WHERE id=?', [req.body.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
};
module.exports = specialities;