
const pool = require('./database.js');
const diseases = {
getAll :async function (req, res){
  try {
  var results=await pool.query('SELECT * FROM diseases');
  console.log(results);
  res.end(JSON.stringify(results));
  }catch(error) {
  throw new Error(error);
  }
},
getAll2:async (req, res) => {
  try{
  console.log("getall----------");
  console.log(req.params.id1);
  var name=req.params.id1;
  const results=await pool.query("select diseases_id,diseases_name from diseases where diseases_name like '%" + name +"%' ");
  res.end(JSON.stringify(results));
  }catch(error) {
      throw new Error(error);
      } 
},
 getOne :async function (req, res) { 
    try{
    var results= await pool.query('select * from diseases where diseases_id=?', [req.params.id]);   
    console.log(results);
    res.end(JSON.stringify(results));
    }catch(error) {
    throw new Error(error);
    }
    },
 create:async function (req, res) {
    try{
    
    var postData = req.body;
    console.log(req.body);
    console.log(postData);
    var results=await pool.query("Insert into diseases(diseases_name,icd_code,active) VALUES('" + req.body.diseases_name + "','" + req.body.icd_code + "','" + req.body.active + "')");
    console.log(results);
    res.end(JSON.stringify(results));
    } catch(error) {
    throw new Error(error);
    }
    },
  update:async function (req, res) {
    try{
    console.log(req.body);
    var results=await pool.query('update diseases set diseases_name=?,icd_code=?,updated_by=?,active=? where diseases_id=?', [req.body.diseases_name, req.body.icd_code, req.body.updated_by, req.body.active, req.body.diseases_id]);
    res.end(JSON.stringify(results));
    }catch(error) {
   throw new Error(error);
    }
    },
 
  delete: function (req, res) {
    console.log(req.params.id);
    connection.query('DELETE FROM  diseases WHERE diseases_id =?', [req.params.exam_id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
      });
    }
  };
module.exports = diseases;