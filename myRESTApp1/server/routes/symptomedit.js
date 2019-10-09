var pool = require('./database.js');
var editsymptoms = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from  symptoms');
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
      var result = await pool.query('select * from symptoms_txn where medical_record_no= ? and episode_id=? and visit_id=?', [req.params.mrno, req.params.epno, req.params.vid]);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        rdata.id = row.id;
        rdata.medical_record_no = row.medical_record_no;
        rdata.episode_id = row.episode_id;
        rdata.visit_id = row.visit_id;
        rdata.additional_notes = row.additional_notes;
      });
      postData.symptoms_txn = rdata;
      try {
        var results = await pool.query('select symptoms_txn_dtls.id,symptoms_txn_dtls.symptoms_txn_id,symptoms_txn_dtls.symptoms_id,symptoms_txn_dtls.description,symptoms.symptom_name from symptoms_txn_dtls,symptoms where symptoms.id=symptoms_txn_dtls.symptoms_id and symptoms_txn_dtls.symptoms_txn_id=?',[rdata.id]);
        postData.symptoms_txn_dtls = results;
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
      var results = await pool.query('select * from symptoms_txn_dtls');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getsymptom: async (req, res) => {
    try {
      var results = await pool.query('select id,symptom_name from symptoms where id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res) => {
    try {
      var results = await pool.query('select symptoms_id,symptoms_name,created_by,created_on,updated_by,active from symptoms where symptoms_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  createDtls: async (req, res) => {
    try {
      var results = await pool.query("Insert into symptoms_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.MRNo + "'," + req.body.ENo + "," + req.body.VNo + ",'" + req.body.Notes + "')");
      res.end(JSON.stringify(results));
      var dtls = req.body.data;
      console.log(dtls.length);
      //@ts-ignore
      var txn_id = results.insertId;
      for (var attributename in dtls) {
        try {
          var result = await pool.query("Insert into  symptoms_txn_dtls(symptoms_txn_id,symptoms_id,description,created_by,created_on) VALUES(" + txn_id + "," + dtls[attributename]['symptoms_id'] + ",'" + dtls[attributename]['description'] + "','" + dtls[attributename]['created_by'] + "','" + dtls[attributename]['created_on'] + "')");
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
      var results = await pool.query("Insert into symptoms_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.additional_notes + "')");
      var bodys = req.body.datadtls;
      //@ts-ignore
      var insid = results.insertId;
      var result = await pool.query("Insert into  symptoms_txn_dtls(symptoms_txn_id,symptoms_id,description,created_by,created_on) VALUES(" + insid + ",'" + bodys.symptoms_id + "','" + bodys.description + "','" + bodys.updated_by + "','" + bodys.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },

  update: async (req, res) => {
    console.log("put-------------");
    try {
      const results = await pool.query("update symptoms_txn set additional_notes=? where id=?", [req.body.Notes, req.body.tid]);
      console.log(results);
      res.end(JSON.stringify(results));
      var dtls = req.body.data;
      console.log(dtls.length);
      //@ts-ignore
      var txn_id = results.insertId;
      try {
        for (var attributename in dtls) {
          const results = await pool.query("update symptoms_txn_dtls set symptoms_txn_id=?,symptoms_id=?,description=?,updated_by=?,updated_on=? where id=?", [dtls[attributename]['symptoms_txn_id'], dtls[attributename]['symptoms_id'], dtls[attributename]['description'], dtls[attributename]['updated_by'], dtls[attributename]['updated_on'], req.body.id]);
          console.log(results);
          res.end(JSON.stringify(results));
        }
      }
      catch (error) {
        throw new Error(error);
      }
    }
    catch (error) {
      throw new Error(error);
    }
  },
  createTxn: async (req, res) => {
    try {
      var results = await pool.query("Insert into symptoms_txn(medical_record_no,episode_id,visit_id,additional_notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.additional_notes + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },

  Create: async (req, res) => {
    try {
      var results = await pool.query('UPDATE symptoms_txn SET additional_notes=? where id=?', [req.body.additional_notes, req.body.id]);
      //@ts-ignore
      var txn_id = results.insertId;
      var results = await pool.query("Insert into  symptoms_txn_dtls(symptoms_txn_id,symptoms_id,description,updated_by,updated_on) VALUES(" + req.body.symptoms_txn_id + ",'" + req.body.symptoms_id + "','" + req.body.description + "','" + req.body.updated_by + "','" + req.body.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },

  delete: async (req, res) => {
    try {
      var results = await pool.query('DELETE FROM  symptoms_txn_dtls WHERE id=?', [req.params.id]);
      var Alter = await pool.query('ALTER TABLE symptoms_txn_dtls AUTO_INCREMENT = 1');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  }
};
module.exports = editsymptoms;