var pool = require('./database.js');

var  disease = {
getAll:async (req, res) => {
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

getOne:async (req, res) => {
    try{
    console.log("getone----------");
    console.log(req.params);
    const results=await pool.query('select disease_id,disease_name,notes from diseasechild,notes where diseasechild.id=notes.id and medical_record_no=? and episode_id=? and visit_id=?',[req.params.mrno,req.params.eid,req.params.vid]);
    res.end(JSON.stringify(results));
    }catch(error) {
        throw new Error(error);
        }
},

create:async (req, res) => {
    try{
    console.log(req.body);
    console.log(req.body.MRNo);
    const results=await pool.query("Insert into notes(medical_record_no,episode_id,visit_id,notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");    
                // @ts-ignore
                console.log(results.insertId);
                var dtls = req.body.data;
                console.log(dtls.length);
                // @ts-ignore
                var txn_id = results.insertId;
                for(var attributename in dtls){
                    try{
                    const results=await pool.query("Insert into diseasechild(id,disease_id,disease_name) VALUES('"+txn_id+"','"+
                        dtls[attributename]['id']+"','"+dtls[attributename]['dname']+"')");

                                // @ts-ignore
                                console.log(results.insertId);
                                res.end(JSON.stringify(results));
                        }catch(error) {
                            throw new Error(error);
                            }
            } 
                res.end(JSON.stringify(results));
        }catch(error) {
            throw new Error(error);
            }
},


//rest api to delete record from mysql database
update: async (req, res) => {
    try{
        var results=await pool.query('delete from diseasechild');
        var results=await pool.query('delete from notes');
    res.end(JSON.stringify(results));
    try{
    var results=await pool.query("Insert into notes(medical_record_no,episode_id,visit_id,notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");
    }
    catch (err) {
    throw new Error(err);
    }
    var dtls = req.body.data;
    console.log(dtls.length);
    // @ts-ignore
    var txn_id = results.insertId;
    for(var attributename in dtls){
    try{
    var results=await pool.query("Insert into diseasechild(id,disease_id,disease_name) VALUES('"+txn_id+"','"+
    dtls[attributename]['id']+"','"+dtls[attributename]['dname']+"')"); 
    res.end(JSON.stringify(results));
    } catch (err) {
    throw new Error(err);
    }
    }
    }
    catch (err) {
    throw new Error(err);
    }
    },

};

module.exports = disease;