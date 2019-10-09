const pool = require('./database.js');

const testgroup = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from test_group');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const results = await pool.query('select test_group_id,test_group_name,created_by,created_on,updated_by,active from test_group where test_group_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  create: async (req, res) => {
    try {
      const results = await pool.query("Insert into test_group(test_group_name,created_by,created_on,active) VALUES('" + req.body.test_group_name + "','" + req.body.created_by + "','" + req.body.created_on + "','" + req.body.active + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  update: async (req, res) => {
    try {
      const results = await pool.query('UPDATE test_group SET test_group_name=?,updated_by=?,updated_on=?,active=? where test_group_id=?', [req.body.test_group_name, req.body.updated_by, req.body.updated_on, req.body.active, req.body.test_group_id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      const results = await pool.query('DELETE FROM test_group WHERE test_group_id=?', [req.body.id]);
      res.end('Record has been deleted!');
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = testgroup;