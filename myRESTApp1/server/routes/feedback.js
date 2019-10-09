var pool = require('./database.js');
var feedback={
    create:async (req, res) => {
        try {
          const results = await pool.query("Insert into feedback(feedback_description,case_id,medical_record_no,episode_id,visit_id) VALUES('" + req.body.feedback_description + "','" + req.body.case_id + "','" + req.body.medical_record_no + "','" + req.body.episode_id + "','" + req.body.visit_id + "')");
          res.end(JSON.stringify(results));
        } catch (error) {
          throw new Error(error);
        }
      },

    getAll:async  (req, res) =>{
        try {
          const results= await pool.query('select * from feedback where medical_record_no=? and episode_id=? and visit_id=? ',[req.params.mrno,req.params.eid,req.params.vid]);
          res.end(JSON.stringify(results));
        }
        catch (err) {
          throw new Error(err);
        }
      }
}
module.exports =feedback;