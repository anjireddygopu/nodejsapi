const pool = require('./database.js');

const test = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from test');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const results = await pool.query('select test_id,test_name,test_group_id,created_by,created_on,updated_by,active from test where test_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getTgOne: async (req, res) => {
    try {
      const results = await pool.query('select * from test_group');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  create: async (req, res) => {
    try {
      const results = await pool.query("Insert into test(test_name,test_group_id,created_by,created_on,active) VALUES('" + req.body.test_name + "','" + req.body.test_group_id + "','" + req.body.created_by + "','" + req.body.created_on + "','" + req.body.active + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body.active);
      const results = await pool.query('UPDATE test SET test_name=?,test_group_id=?,updated_by=?,updated_on=?,active=? where test_id=?', [req.body.test_name, req.body.test_group_id, req.body.updated_by, req.body.updated_on, req.body.active, req.body.test_id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      const results = await pool.query('DELETE FROM test WHERE test_id=?', [req.body.id]);
      res.end('Record has been deleted!');
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = test;