var pool = require('./database.js');

var pasthistory = {
getAll:async (req, res) => {
    try{
    console.log("get----------")
    const results=await pool.query('select * from pasthistory');
    console.log(results);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        } 
},

getOne:async (req, res) => {
    try{
    console.log(req);
    const results=await pool.query('select * from pasthistory where medical_record_no=?', [req.params.mrno]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        } 
},

create:async (req, res) => {
    try{
    var postData = req.body;
    const results=await pool.query('INSERT INTO pasthistory SET ?', postData);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        } 
},

update:async (req, res) => {
    try{
    console.log("put------");
    const results=await pool.query('UPDATE pasthistory SET mediacl_history=?,surgical_history=?,medication_history=?,updated_on=? where medical_record_no=?', [req.body.mediacl_history,req.body.surgical_history,req.body.medication_history,req.body.updated_on,req.body.medical_record_no]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        } 
},

delete: (req, res) => {
    var id = req.params.id;
    // @ts-ignore
    data.splice(id, 1); // Spoof a DB call
    res.json(true);
}

};
module.exports = pasthistory;