const pool = require('./database.js');

var occupation = {

getAll:async (req, res) => {
    try{
    console.log("get----------");
    const results=await pool.query('select * from occupation');
    console.log(results);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

getOne:async function (req, res) {
    try{
    console.log(req);
    const results=await pool.query('select * from occupation where occupation_id=?', [req.params.occupation_id]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

create:async (req, res) => {
    try{
    var postData = req.body;
    const results=await pool.query('INSERT INTO occupation SET ?', postData);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

update:async (req, res) => {
    try{
    console.log("put------");
    const results=await pool.query('UPDATE occupation SET occupation_name=?,updated_on=?,active=? where occupation_id=?', [req.body.occupation_name,req.body.updated_on,req.body.active,req.body.occupation_id]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
    },

delete: function(req, res) {
var id = req.params.id;
data.splice(id, 1); 
res.json(true);
}
};
module.exports = occupation;