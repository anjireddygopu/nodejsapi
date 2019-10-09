const pool = require('./database.js');
const religion = {
   
  getAll:async function (req, res) {
    try{
    var results=await pool.query('select * from religion');
    res.end(JSON.stringify(results));
    }catch(error){
     throw new Error(error);
    }
  },
  getOne:async function (req, res) {
    try{
    console.log(req.params.id);
    var results=await pool.query('select * from religion where religion_id=?', [req.params.id]);
    console.log(results);
    res.end(JSON.stringify(results));
    }catch (error) {
     throw new Error(error);
    } 
  },
  create:async function (req, res) {
    try{
    var postData = req.body;
    console.log(req.body);
    console.log(postData);
    console.log(results);
    var results=await pool.query("Insert into religion(religion_name,created_by,active) VALUES('" + req.body.religion_name + "','" + req.body.created_by + "','" + req.body.active + "')");
    console.log(results);
    res.end(JSON.stringify(results));
    }
    catch(error){
    throw new Eror(error)
    }
  },
  update:async function (req, res) {
    try{
    console.log("put.....");
    console.log(req.body.religion_name);
    var results=pool.query('update religion set religion_name=?,active=? where religion_id=?', [req.body.religion_name, req.body.active, req.body.religion_id]);
    console.log(results);
    res.end(JSON.stringify(results));
    }
    catch(error)  {
    throw new Error(error);
    }
  },
  delete:async function (req, res) {
    console.log(req.params.id);
    connection.query('DELETE FROM  religion WHERE religion_id=?', [req.paramsreligion_id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
    });
  }
};
module.exports = religion;
