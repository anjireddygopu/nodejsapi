const pool = require('./database.js');
const nationality = {
getAll:async (req, res)=> {
    try{
    const results=await pool.query('select nationality_id,nationality_name,active from nationality'); 
        res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
},
getOne:async (req, res)=> {
    try{
    const results=await pool.query('select * from nationality where nationality_id=?', [req.params.id]);
        res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
},
create:async (req, res)=> {
    try{
    const results=await pool.query("Insert into nationality(nationality_name,created_by,created_on,updated_by,updated_on,active) VALUES('"+req.body.nationality_name+"','"+req.body.created_by+"','"+req.body.created_on+"','"+req.body.updated_by+"','"+req.body.updated_on+"','"+req.body.active+"')");
    res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
},
update:async (req, res)=> {
    try{
    const results=await pool.query('UPDATE nationality SET nationality_name=?,updated_on=?,active=? WHERE nationality_id=?', [req.body.nationality_name,req.body.updated_on,req.body.active,req.body.nationality_id]); 
        res.end('Record has been updated!');
    }
    catch(err){
        throw new Error(err);
    }
  }
};
module.exports = nationality;