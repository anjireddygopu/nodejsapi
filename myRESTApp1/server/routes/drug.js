const pool = require('./database.js');
const patients = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from drug');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    try {
      console.log(req.params.id);
      const results = await pool.query('select * from drug where drug_id=?', [req.params.id]);
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
      const results = await pool.query("Insert into drug(drug_name,created_by,active) VALUES('" + req.body.drug_name + "','" + req.body.created_by + "','" + req.body.active + "')");
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body);
      const results = await pool.query('update drug set drug_name=?,updated_by=?,updated_on=?,active=? where drug_id=?', [req.body.drug_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.drug_id]);

      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (req, res) => {
    try {
      console.log(req.params.id);
      const results = await pool.query('DELETE FROM  drug WHERE `id`=?', [req.params.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = patients;