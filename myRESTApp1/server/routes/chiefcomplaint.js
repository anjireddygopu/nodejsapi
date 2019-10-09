var pool = require('./database.js');

var  chiefcomplaint = {

getAll:async (req, res) => {
    try{
    console.log("get----------")
    const results=await pool.query('select * from chiefcomplaint');
    console.log(results);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }  
},

getOne:async (req, res) => {
    try{
    console.log(req);
    const results=await pool.query('select chief_complaint from chiefcomplaint where medical_record_no=? and episode_id=? and visit_id=?', [req.params.mrno,req.params.eid,req.params.vid]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }  
},

create:async (req, res) => {
    try{
    var postData = req.body;
    const results=await pool.query('INSERT INTO  chiefcomplaint SET ?', postData)
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }  
},

update:async (req, res) => {
    try{
    console.log("put------");
    const results=await pool.query('UPDATE chiefcomplaint SET chief_complaint=?,updated_by=?,updated_on=? where medical_record_no=?', [req.body.chief_complaint,req.body.updated_by,req.body.updated_on,req.body.medical_record_no]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        } 
    },

delete: function(req, res) {
var id = req.params.id;
// @ts-ignore
data.splice(id, 1); // Spoof a DB call
res.json(true);
}

};
module.exports = chiefcomplaint;