var pool = require('./database.js');
var editsigns = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from  signs');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getTxn: async (req, res) => {
    try {
      const postData = {};
      var rdata = {};
      var result = await pool.query('select * from sign_txn where medical_record_no= ? and episode_id=? and visit_id=?', [req.params.mrno, req.params.epno, req.params.vid]);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        rdata.id = row.id;
        rdata.medical_record_no = row.medical_record_no;
        rdata.episode_id = row.episode_id;
        rdata.visit_id = row.visit_id;
        rdata.additional_notes = row.additional_notes;
      });
      postData.sign_txn = rdata;
      try {
        var results = await pool.query('select sign_txn_dtls.id,sign_txn_dtls.sign_txn_id,sign_txn_dtls.sign_id,sign_txn_dtls.description,signs.sign_name from sign_txn_dtls,signs where signs.id=sign_txn_dtls.sign_id and sign_txn_id=?',[rdata.id]);
        postData.sign_txn_dtls = results;
      } catch (err) {
        throw new Error(err);
      }
      res.end(JSON.stringify(postData));
    } catch (err) {
      throw new Error(err);
    }
  },
  getDtls: async (req, res) => {
    try {
      var results = await pool.query('select * from sign_txn_dtls');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getsigns: async (req, res) => {
    try {
      var results = await pool.query('select id,sign_name from signs where id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res) => {
    try {
      var results = await pool.query('select signs_id,sign_name,created_by,created_on,updated_by,active from signs where sign_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  createDtls: async (req, res) => {
    try {
      var results = await pool.query("Insert into sign_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.MRNo + "'," + req.body.ENo + "," + req.body.VNo + ",'" + req.body.Notes + "')");
      res.end(JSON.stringify(results));
      var dtls = req.body.data;
      console.log(dtls.length);
      //@ts-ignore
      var txn_id = results.insertId;
      for (var attributename in dtls) {
        try {
          var result = await pool.query("Insert into  sign_txn_dtls(sign_txn_id,sign_id,description,created_by,created_on) VALUES(" + txn_id + "," + dtls[attributename]['sign_id'] + ",'" + dtls[attributename]['description'] + "','" + dtls[attributename]['created_by'] + "','" + dtls[attributename]['created_on'] + "')");
          res.end(JSON.stringify(result));
        } catch (err) {
          throw new Error(err);
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  createTxns: async (req, res) => {
    try {
      var results = await pool.query("Insert into sign_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.additional_notes + "')");
      var bodys = req.body.datadtls;
      //@ts-ignore
      var insid = results.insertId;
      var result = await pool.query("Insert into sign_txn_dtls(sign_txn_id,sign_id,description,created_by,created_on) VALUES(" + insid + ",'" + bodys.sign_id + "','" + bodys.description + "','" + bodys.updated_by + "','" + bodys.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  update: async (req, res) => {
    try {
      var results = await pool.query('UPDATE sign_txn SET additional_notes=? where id=?', [req.body.Notes, req.body.tid]);
      //@ts-ignore
      var txn_id = results.insertId;
      var dtls = req.body.data;
      console.log(dtls.length);
      for (var attributename in dtls) {
        try {
          var results = await pool.query("update sign_txn_dtls set sign_txn_id=?,sign_id=?,description=?,updated_by=?,updated_on=? where id=?", [dtls[attributename]['sign_txn_id'], dtls[attributename]['sign_id'], dtls[attributename]['description'], dtls[attributename]['updated_by'], dtls[attributename]['updated_on'], req.body.id]);
          res.end(JSON.stringify(results));
        } catch (err) {
          throw new Error(err);
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  createTxn: async (req, res) => {
    try {
      var results = await pool.query("Insert into sign_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.additional_notes + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },

  Create: async (req, res) => {
    try {
      var results = await pool.query('UPDATE sign_txn SET additional_notes=? where id=?', [req.body.additional_notes, req.body.id]);
      //@ts-ignore
      var txn_id = results.insertId;
      var results = await pool.query("Insert into  sign_txn_dtls(sign_txn_id,sign_id,description,updated_by,updated_on) VALUES(" + req.body.sign_txn_id + ",'" + req.body.sign_id + "','" + req.body.description + "','" + req.body.updated_by + "','" + req.body.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      var results = await pool.query('DELETE FROM  sign_txn_dtls WHERE id=?', [req.params.id]);
      var Alter = await pool.query('ALTER TABLE sign_txn_dtls AUTO_INCREMENT = 1');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  }
};
module.exports = editsigns;