var pool = require('./database.js');
var salutation = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from  salutation');
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    var postData = req.body;
    console.log(req.body.id);
    try {
      const results = await pool.query('select * from salutation where salutation_id=?', [req.params.id]);
     
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
  create: async (req, res) => {
    var postData = req.body;
    try {
      const results = await pool.query("Insert into salutation(salutation_name,created_by,active) VALUES('" + req.body.salutation_name + "','" + req.body.created_by + "','" + req.body.active + "')");
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
      const results = await pool.query('UPDATE salutation SET  salutation_name=?,updated_by=?,updated_on=?,active=? where salutation_id=?', [req.body.salutation_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.salutation_id]);
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
      const results = await pool.query('DELETE FROM salutation WHERE id=?', [req.body.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    }
    catch (error) {
      throw new Error(error);
    }
  },
};
module.exports = salutation;