const pool = require('./database.js');
const languages = {
getAll:async (req,res)=> {
    try {
        const results =await pool.query('select language_id,language_name,active from languages');
        res.end(JSON.stringify(results));
    }
    catch (err) {
    throw new Error(err);
    }
},
getOne: async (req, res)=> {
    try{
    const results=await pool.query('select * from languages where language_id=?', [req.params.id]);
        res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
},
create: async (req, res)=> {
    try{
     const results=await pool.query("Insert into languages(language_name,created_by,created_on,updated_by,updated_on,active) VALUES('"+req.body.language_name+"','"+req.body.created_by+"','"+req.body.created_on+"','"+req.body.updated_by+"','"+req.body.updated_on+"','"+req.body.active+"')");
    res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
     }
},
update: async (req, res)=> {
    try{
    const results=await pool.query('UPDATE languages SET language_name=?,updated_on=?,active=? WHERE language_id=?', [req.body.language_name,req.body.updated_on,req.body.active,req.body.language_id]);
        res.end(JSON.stringify(results));
    }    
    catch(err){
        throw new Error(err); 
     }  
  } 
};

module.exports = languages;