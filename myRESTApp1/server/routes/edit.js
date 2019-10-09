const pool = require('./database.js');
const edit = {
  getAll: async (req, res) => {
    try {
      const postData = {};
      var rdata = {};
      var result = await pool.query('select * from physical_exam_txn where medical_record_no=? and episode_id=? and visit_id=?', [req.params.mrno, req.params.eid, req.params.vid]);
      Object.keys(result).forEach(function (key) {
        var row = result[key];
        rdata.id = row.id;
        rdata.medical_record_no = row.medical_record_no;
        rdata.episode_id = row.episode_id;
        rdata.visit_id = row.visit_id;
        rdata.notes = row.notes;
      })
      postData.physical_exam_txn = rdata;
      var results = await pool.query('select * from physical_exam_txn_dtls where physical_exam_txn_id=?',[rdata.id]);
      postData.physical_exam_txn_dtls = results;
      res.end(JSON.stringify(postData));
    } catch (err) {
      throw new Error(err);
    }
  },
  getDtls:async (req, res) => {
    try {
      console.log(req.params.id);
      const results = await pool.query('select * from physical_exam_txn_dtls');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
 
  createTxns: async (req, res) => {
    try {
      var results = await pool.query("Insert into physical_exam_txn(medical_record_no,episode_id,visit_id,notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.notes + "')");
      var bodyb = req.body.datadtls;
      res.end(JSON.stringify(results));
      //@ts-ignore
      var inside = results.insertId;
      try{
      var result = await pool.query("Insert into physical_exam_txn_dtls(exam_type,exam_specific,status,description,exam_progress,exam_date,physical_exam_txn_id,created_by,updated_by) VALUES('" + bodyb.exam_type + "','" + bodyb.exam_specific + "','" + bodyb.status + "','" + bodyb.description + "','" + bodyb.exam_progress + "','" + bodyb.exam_date + "','" + inside + "','" + bodyb.created_by + "','" + bodyb.updated_by + "')");
      res.end(JSON.stringify(result));
    }
    catch (err) {
      throw new Error(err);
    }
    } catch (err) {
      throw new Error(err);
    }
  },
  create: async (req, res) => {
    try {
      const result = await pool.query("update physical_exam_txn set notes=? where id=?", [req.body.notes, req.body.id]);
      res.end(JSON.stringify(result));
      //@ts-ignore
      //var txn_id = results.insertId;
      var results = await pool.query("Insert into physical_exam_txn_dtls(exam_type,exam_specific,status,description,exam_progress,exam_date,physical_exam_txn_id,created_by,updated_by) VALUES('" + req.body.exam_type + "','" + req.body.exam_specific + "','" + req.body.status + "','" + req.body.description + "','" + req.body.exam_progress + "','" + req.body.exam_date + "','" + req.body.physical_exam_txn_id + "','" + req.body.created_by + "','" + req.body.updated_by + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  update: async (req, res) => {
    try {
      console.log("put-------------");
      console.log(req.body.notes);
      console.log(req.body.id);
      const results = await pool.query("update physical_exam_txn set notes=? where id=?", [req.body.notes, req.body.id]);
      //@ts-ignore
      var txn_id = results.insertId;
      var dtls = req.body.data;
      console.log(dtls.length);
      for (var attributename in dtls) {
        try {
          const results2 = await pool.query("update physical_exam_txn_dtls set exam_type=?,exam_specific=?,status=?,description=?,exam_progress=?,exam_date=?,updated_by=?,updated_on=? where exam_id=?",
            [dtls[attributename]['exam_type'],
            dtls[attributename]['exam_specific'],
            dtls[attributename]['status'],
            dtls[attributename]['description'],
            dtls[attributename]['exam_progress'],
            dtls[attributename]['exam_date'],
            dtls[attributename]['updated_by'],
            dtls[attributename]['updated_on'],
            req.body.tid]);
          console.log(results2);
          res.end(JSON.stringify(results2));
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
      var results = await pool.query("Insert into physical_exam_txn(medical_record_no,episode_id,visit_id,notes) VALUES('" + req.body.medical_record_no + "'," + req.body.episode_id + "," + req.body.visit_id + ",'" + req.body.notes + "')");
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (req, res) => {
    try {
      const results = await pool.query('DELETE FROM  physical_exam_txn_dtls WHERE exam_id=?', [req.params.id]);
      const alter = await pool.query('ALTER TABLE physical_exam_txn AUTO_INCREMENT=1');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = edit;








