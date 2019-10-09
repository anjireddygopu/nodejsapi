const pool = require('./database.js');
var habitstxn = {
  getAll: async (req, res) => {
    try {
      var results = await pool.query('SELECT * FROM habits');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getTxn: async (req, res) => {
    try {
      const postData = {};
      var rdata={};
      var result=await pool.query('select * from habits_txn where mediacl_record_no= ? ',[req.params.mrno]);
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        rdata.id=row.id;
        rdata.medical_record_no=row.mediacl_record_no;
        rdata.additional_notes=row.additional_notes;
        });
        postData.habits_txn = rdata;
        try {
      console.log(rdata.id);
        var results = await pool.query('select habits_txn_dtls.id,habits_txn_dtls.habit_txn_id,habits_txn_dtls.habit_id,habits_txn_dtls.description,habits.habit_name from habits_txn_dtls,habits where habits.habit_id=habits_txn_dtls.habit_id and habits_txn_dtls.habit_txn_id=?',[rdata.id]);
        postData.habits_txn_dtls = results;
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
      var results = await pool.query('select * from habits_txn_dtls');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getHabit: async (req, res) => {
    try {
      var results = await pool.query('select id,habit_name from habits where id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res) => {
    try {
      var results = await pool.query('select habit_id,habit_name,created_by,created_on,updated_by,active from habit where habit_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  createDtls: async (req, res) => {
    try {
      var results = await pool.query("Insert into habits_txn(mediacl_record_no,additional_notes) VALUES('" + req.body.MRNo + "','" + req.body.Notes + "')");
      res.end(JSON.stringify(results));
      var dtls = req.body.data;
      console.log(dtls.length);
      //@ts-ignore
      var txn_id = results.insertId;
      for (var attributename in dtls) {
        try {
          var result = await pool.query("Insert into habits_txn_dtls(habit_txn_id,habit_id,description,created_by,created_on) VALUES(" + txn_id + "," + dtls[attributename]['habit_id'] + ",'" + dtls[attributename]['description'] + "','" + dtls[attributename]['created_by'] + "','" + dtls[attributename]['created_on'] + "')");
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
      var results = await pool.query("Insert into habits_txn(mediacl_record_no,additional_notes) VALUES('" + req.body.mediacl_record_no + "','" + req.body.additional_notes + "')");
      var bodys=req.body.datadtls;
      //@ts-ignore
      var insid=results.insertId;
      var result = await pool.query("Insert into habits_txn_dtls(habit_txn_id,habit_id,description,created_by,created_on) VALUES(" + insid  + ",'" + bodys.habit_id  + "','" + bodys.description  + "','" + bodys.updated_by + "','" + bodys.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  update: async (req, res) => {
    try {
      var results = await pool.query('UPDATE habits_txn SET additional_notes=? where id=?', [req.body.Notes, req.body.tid]);
      //@ts-ignore
      var txn_id = results.insertId;
      var dtls = req.body.data;
      console.log(dtls.length);
      for (var attributename in dtls) {
        try {
          var results = await pool.query("UPDATE habits_txn_dtls SET habit_txn_id=?,habit_id=?,description=?,updated_by=?,updated_on=? where id=?", [dtls[attributename]['habit_txn_id'], dtls[attributename]['habit_id'], dtls[attributename]['description'], dtls[attributename]['updated_by'], dtls[attributename]['updated_on'], req.body.id]);
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
      var results = await pool.query("Insert into habits_txn(mediacl_record_no,additional_notes) VALUES('" + req.body.mediacl_record_no + "','" + req.body.additional_notes + "')");
      res.end(JSON.stringify(results));
     } catch (err) {
      throw new Error(err);
    }
  },
  createDtlsCreate: async (req, res) => {
    try {
      var results = await pool.query('UPDATE habits_txn SET additional_notes=? where id=?', [req.body.additional_notes, req.body.id]);
      //@ts-ignore
      var txn_id = results.insertId;
      var results = await pool.query("Insert into habits_txn_dtls(habit_txn_id,habit_id,description,created_by,created_on) VALUES(" + req.body.habit_txn_id  + ",'" + req.body.habit_id  + "','" + req.body.description  + "','" + req.body.updated_by + "','" + req.body.updated_on + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      var results = await pool.query('DELETE FROM habits_txn_dtls WHERE id=?', [req.body.id]);
      var Alter = await pool.query('ALTER TABLE habits_txn_dtls AUTO_INCREMENT = 1');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = habitstxn;