var pool = require('./database.js');
var doctor = {
  getall1:async  (req, res) =>{
    try {
      const results= await pool.query('select  facility_center_id,facility_center_name from tm_expert_center');
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  getAll: async  (req, res) =>{
    try {
      const results= await pool.query('select  d.doctor_id,s.salutation_name, d.doctor_name,d.qualification,s1.specialization_name, d.personal_contact_no,d.email_id  from doctor_details d join salutation s on d.title=s.salutation_id join specialities s1 on d.specialisatiion=s1.specialization_id');
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res)=> {
    try {
      const results = await pool.query('select  * from doctor_details where doctor_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  create: async  (req, res)=> {
    try {
      var postData = req.body;
      const results = await pool.query('INSERT INTO doctor_details set ?', postData);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  update: async  (req, res)=> {
    try {
      const results = await pool.query('update doctor_details set doctor_name=?,title=?,qualification=?,specialisatiion=?,register_no=?,address_line_1=?,address_line_2=?,office_contact_no=?,personal_contact_no=?,email_id=?,country=?,state=?,district=?,city=?,zipcode=?,residence_address_line_1=?,residence_address_line_2=?,residence_contact_no=?,res_country=?,res_state=?,res_district=?,res_city=?,zip=?,updated_by=?,updated_on=? where doctor_id=?', [req.body.doctor_name, req.body.title, req.body.qualification, req.body.specialisatiion, req.body.register_no, req.body.address_line_1, req.body.address_line_2, req.body.office_contact_no, req.body.personal_contact_no, req.body.email_id, req.body.country, req.body.state, req.body.district, req.body.city, req.body.zipcode, req.body.residence_address_line_1, req.body.residence_address_line_2, req.body.residence_contact_no, req.body.res_country, req.body.res_state, req.body.res_district, req.body.res_city, req.body.zip, req.body.updated_by, req.body.updated_on, req.body.doctor_id]);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
};
module.exports = doctor;