const pool=require('./database.js');
const diettxn= {
    getAll1: async function (req, res) {
      try{
     
        const results =await pool.query('select * from  diet');
        console.log(results);
      res.end(JSON.stringify(results));
      } catch(error) {
      throw new Error(error);
      }
      },
      getAll: async function (req, res) {
        try{
          console.log(req.params.id1);
          var name=req.params.id1;
          console.log(name);
          const results =await pool.query("select * from diet where diet_name like '%" + name +"%' ");
         console.log(results);
        res.end(JSON.stringify(results));
        } catch(error) {
        throw new Error(error);
        }
        },

getOne:async function(req, res) {
  try{
    const results =await  pool.query('select diet_id,diet_name,additional_notes from  diet_details_txn_dtls join diet_details_txn where diet_details_txn_dtls.txn_id=diet_details_txn.txn_id and diet_details_txn.medical_record_no= ? and diet_details_txn.episode=? and diet_details_txn.visit=?',[req.params.mrno,req.params.eid,req.params.vid]);
    console.log(results);
    res.end(JSON.stringify(results));
    } catch(error) {
    throw new Error(error);
    }
  },
//
create:async (req, res) => {
  try{
  console.log(req.body);
  console.log(req.body.MRNo);

 const results=await pool.query("Insert into diet_details_txn(medical_record_no,episode,visit,additional_notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");
              
             
              // @ts-ignore
console.log(results.insertId);

              var dtls = req.body.data;
              console.log(dtls.length);
              // @ts-ignore
var txn_id = results.insertId;
              for(var attributename in dtls){
                try{
                const results2=pool.query("Insert into diet_details_txn_dtls(txn_id,diet_id,diet_name) VALUES('"+txn_id+"','"+
                      dtls[attributename]['id']+"','"+
                      dtls[attributename]['name']+"')")
                             
                           //console.log(results.insertId);
                            res.end(JSON.stringify(results2))
                            }catch(err) {
                              throw new Error(err);
                              }
                              }
                            }catch(err) {
                              throw new Error(err);
                              }
                              },
                              
//

update:async (req, res) => {
  try{
  const results =await pool.query('delete from diet_details_txn_dtls');
 const results1 =await pool.query('delete from diet_details_txn');
  try{
  const results=await pool.query("Insert into diet_details_txn(medical_record_no,episode,visit,additional_notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");
              // @ts-ignore
console.log(results.insertId);

              var dtls = req.body.data;
              console.log(dtls.length);
              // @ts-ignore
var txn_id = results.insertId;
              for(var attributename in dtls){
                try{
                  const results=await  pool.query("Insert into diet_details_txn_dtls(txn_id,diet_id,diet_name) VALUES('"+txn_id+"','"+
                dtls[attributename]['id']+"','"+
                dtls[attributename]['dname']+"')")
                            
                  // @ts-ignore
console.log(results.insertId);
                           
                  res.end(JSON.stringify(results));
                  }catch(err) {
                  throw new Error(err);
                  }
                  }}
                  catch(err) {
                  throw new Error(err);
                  }
                  }
                  catch(err) {
                  throw new Error(err);
                  }
    }    }


module.exports = diettxn;