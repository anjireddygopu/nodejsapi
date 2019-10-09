var pool = require('./database.js');
var facilities = {
  getAll:async (req, res)=> {
    try{
 const results= await pool.query('select  facility_center_id, facility_center_name, contact_person_name, contact_no1,email_id ,active from  tm_expert_center');
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  getOne: async (req, res)=> {
  try{
 const results=await pool.query('select  * from tm_expert_center where facility_center_id=?', [req.params.id]);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
  create: async (req, res)=> {
    try{
      console.log(req.body);
    var postData = req.body;
 const results=await pool.query('INSERT INTO tm_expert_center set ?', postData);
 console.log(results);
      res.end(JSON.stringify(results));
 }
 catch (err) {
  throw new Error(err);
}
  },
  update: async (req, res)=> {
    try{
 const results=await pool.query('update tm_expert_center set facility_center_name=?,active=?,address_line1=?,address_line2=?,country=?,state=?,district=?,zip=?,longitude=?,latitude=?,contact_person_name=?,email_id=?,contact_no1=?,contact_no2=?,fax=?,updated_by=?,updated_on=?,city=?,password=? where facility_center_id=?', [req.body.facility_center_name, req.body.active, req.body.address_line1, req.body.address_line2, req.body.country, req.body.state, req.body.district, req.body.zip, req.body.longitude, req.body.latitude, req.body.contact_person_name, req.body.email_id, req.body.contact_no1, req.body.contact_no2, req.body.fax, req.body.updated_by, req.body.updated_on, req.body.city,req.body.password, req.body.facility_center_id]);
      res.end(JSON.stringify(results));
    }
    catch (err) {
      throw new Error(err);
    }
  },
};
module.exports = facilities;