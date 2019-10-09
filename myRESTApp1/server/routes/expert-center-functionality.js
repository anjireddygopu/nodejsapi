var pool = require('./database.js');
var details={
    getAll:async  (req, res) =>{
        try {
          //const results= await pool.query(' select p.patient_id,p1.first_name,p1.last_name,p.query from  post_case p,patient_registration p1 where p.patient_id=p1.record_no and p.doctor_id=?',[req.params.id]);
         const results=await pool.query('select pc.*,pr.* from post_case pc,patient_registration pr where pc.medical_record_no=pr.record_no and doctor_id=?',[req.params.id]);
          res.end(JSON.stringify(results));
        }
        catch (err) {
          throw new Error(err);
        }
      },
 getOne:async  (req, res) =>{
    try {
      const results= await pool.query('select doctor_id,doctor_name from doctor_details where expert_center_name=?',[req.params.id]);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  getTwo:async  (req, res) =>{
    try {
      const results= await pool.query('select   facility_center_id,facility_center_name from tm_expert_center');
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  getcase:async (req,res) =>{
    try{
      const results=await pool.query('select * from patient_case_details where id=?',[req.params.id]);
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    }
  },
  create: async (req, res) => {
    try {
      var postData = req.body;
      const results = await pool.query("Insert into post_case(case_id,expert_center_id,doctor_id,query,medical_record_no,episode_id,visit_id) VALUES('" + req.body.case_id + "','" + req.body.expert_center_id + "','" + req.body.doctor_id + "','" + req.body.query + "','" + req.body.medical_record_no+ "','" + req.body.episode_id + "','" + req.body.visit_id + "')");
      // @ts-ignore
      var id=results.insertId;
      console.log(id);
    var  posted="Y";
      const results1=await pool.query("update  patient_case_details set posted=? where id=?",[posted,req.body.case_id] );
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports =details;