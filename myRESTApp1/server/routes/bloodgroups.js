const pool = require('./database.js');

var bloodgroup = {
    
getAll:async (req, res) => {
    try{
    console.log('get----------');
    const results=await pool.query('select * from bloodgroups');
    console.log(results);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

getOne:async (req, res) => {
    try{
    console.log(req);
    const results=await pool.query('select * from bloodgroups where bloodgroup_id=?', [req.params.bloodgroup_id]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

create:async (req,res) => {
    try{
    var postData = req.body;
    const results=await pool.query('INSERT INTO bloodgroups SET ?', postData);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

update:async (req, res) => {
    try{
    console.log('put------');
    const results=await pool.query('UPDATE bloodgroups SET bloodgroup_name=?,updated_on=?,active=? where bloodgroup_id=?', [req.body.bloodgroup_name,req.body.updated_on,req.body.active,req.body.bloodgroup_id]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

delete: (req, res) => {
    var id = req.params.id;
    data.splice(id, 1); // Spoof a DB call
    res.json(true);
}

};
module.exports = bloodgroup;