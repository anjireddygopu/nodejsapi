const pool = require('./database.js');
const olduserlogin = {
    getOne:async (req, res)=> {
        console.log(req.body);
        try{
        const results=await pool.query('select * from registration where r_name=? and r_password=?', [req.params.olduser_name,req.params.olduser_password]);
        console.log(results);
            res.end(JSON.stringify(results));
        }
        catch(err){
            throw new Error(err);
        }
    }
};
module.exports = olduserlogin;