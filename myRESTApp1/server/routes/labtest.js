var pool=require('./database.js');

var test= {
	getAll: async function(req, res) {
    try{
       console.log(req.params.id);
   var name=req.params.id;
       const results=await pool.query("select test_id,test_name from test where test_name like '%" + name +"%' ");
       res.end(JSON.stringify(results));
    }
    catch(error){
           throw new Error(error);
         }
    
    },

	 	getAll2: async function(req, res) {
      try{  
        const results=await pool.query('select test_name,test_id,notes from  test_details_txn_dtls ,test_details_txn where test_details_txn_dtls.txn_id=test_details_txn.txn_id and test_details_txn.medical_record_no= ? and test_details_txn.episode=? and test_details_txn.visit_id=?',[req.params.mrno,req.params.eid,req.params.vid]);
          console.log(results);  
          res.end(JSON.stringify(results));
          }
          catch(error){
            throw new Error(error);
          }
     },
    
	
	
     update: async function(req, res) {
      try{
        var results=await pool.query('delete from test_details_txn_dtls');
        var results=await pool.query('delete from test_details_txn');
           res.end(JSON.stringify(results));
            try{
              var results=await pool.query("Insert into test_details_txn(medical_record_no,episode,visit_id,notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");
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
                          var results=await pool.query("Insert into test_details_txn_dtls(txn_id,test_name,test_id) VALUES('"+txn_id+"','"+dtls[attributename]['test_name']+"','"+dtls[attributename]['id']+"')"); 
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
                
          
	
     create:async function(req, res) {
      try{
      var results= await pool.query("Insert into test_details_txn(medical_record_no,episode,visit_id,notes) VALUES('"+req.body.MRNo+"','"+req.body.ENo+"','"+req.body.VNo+"','"+req.body.Notes+"')");
                  
                  res.end(JSON.stringify(results));
  
                  var dtls = req.body.data;
                  console.log(dtls.length);
                  // @ts-ignore
        var txn_id = results.insertId;
                  for(var attributename in dtls){
  
                      try{
                      var result=await pool.query("Insert into test_details_txn_dtls(txn_id,test_name,test_id) VALUES('"+txn_id+"','"+
                          dtls[attributename]['test_name']+"','"+
                          dtls[attributename]['id']+"')");
              res.end(JSON.stringify(result));
              }
              catch (err) {
  throw new Error(err);
  }
  }
  } catch (err) {
  throw new Error(err);
  }
  },  
     
   };
    
  
   module.exports = test;