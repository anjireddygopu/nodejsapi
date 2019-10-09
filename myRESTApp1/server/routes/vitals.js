"use strict";
const pool = require('./database.js');
const vitals = {
  getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from patient_vitals_txn');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (req, res) => {
    try {
      console.log(req.params.MRNO);
      const results = await pool.query('select * from patient_vitals_txn where medical_record_no=? and episode_id=? and visit_id=?',[req.params.mrno,req.params.eid,req.params.vid]);
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
      const results = await pool.query("Insert into patient_vitals_txn(medical_record_no,episode_id,visit_id,weight,weight_unit,height1,height1_unit,height2,height2_unit,bmi,bp_systolic,bp_diastolic,temperature,pulse_rate,pulse_pattern,pulse_volume,additional_notes,created_by)VALUES('" + req.body.medical_record_no + "','" + req.body.episode_id + "','" + req.body.visit_id + "','" + req.body.weight + "','" + req.body.weight_unit + "','" + req.body.height1 + "','" + req.body.height1_unit + "','" + req.body.height2 + "','" + req.body.height2_unit + "','" + req.body.bmi + "','" + req.body.bp_systolic + "','" + req.body.bp_diastolic + "','" + req.body.temperature + "','" + req.body.pulse_rate + "','" + req.body.pulse_pattern + "','" + req.body.pulse_volume + "','" + req.body.additional_notes + "','" + req.body.created_by + "')");
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body);
      const results = await pool.query('update patient_vitals_txn set episode_id=?,visit_id=?,weight=?,weight_unit=?,height1=?,height1_unit=?,height2=?,height2_unit=?,bmi=?,bp_systolic=?,bp_diastolic=?,temperature=?,pulse_rate=?,pulse_pattern=?,pulse_volume=?,additional_notes=?,updated_by=?,updated_on=? where medical_record_no=?', [ req.body.episode_id, req.body.visit_id, req.body.weight, req.body.weight_unit, req.body.height1, req.body.height1_unit, req.body.height2, req.body.height2_unit, req.body.bmi, req.body.bp_systolic, req.body.bp_diastolic, req.body.temperature, req.body.pulse_rate, req.body.pulse_pattern, req.body.pulse_volume, req.body.additional_notes, req.body.updated_by, req.body.updated_on, req.body.medical_record_no]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: (req, res) => {
    console.log(req.params.id);
    const results = pool.query('DELETE FROM  vitals WHERE `vital_id`=?', [req.params.vital_id], function (error, results, fields) {
      if (error) throw error;
      res.end('Record has been deleted!');
    });
  }
};
module.exports = vitals;