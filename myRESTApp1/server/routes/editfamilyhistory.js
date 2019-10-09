var pool=require('./database.js');
var editfamilyhistory = {
  getAll:async (req, res)=>{
    try{
      const postData = {};
      var recordsList = [];
      var recorddata={};
      const results = await pool.query('select * from family_history_txn where medical_record_no= ? ',[req.params.mrno]);
      Object.keys(results).forEach(function(key) {
      var row = results[key];
      recorddata.id=row.id;
      recorddata.medical_record_no=row.medical_record_no;
     
      recorddata.additional_notes=row.additional_notes;
      }) 
      postData.family_history_txn = recorddata;
      try{
        //postData.family_history_txn = recorddata;
      const results1 = await pool.query('select fd.id,fd.disease_name,fhd.mother,fhd.father,fhd.brother,fhd.sister,fhd.paternal,fhd.maternal from family_diseases fd,family_history_txn_dtls fhd where fhd.family_disease_id=fd.id and fhd.family_history_txn_id=?',[recorddata.id]);
      Object.keys(results1).forEach(function(key1) {
      var datarecord = {};
      var row1=results1[key1];
      datarecord.id =row1.id;
      datarecord.disease_name =row1.disease_name;
      datarecord.family_history_txn_id=row1.family_history_txn_id;
      datarecord.mother=row1.mother;
      datarecord.father=row1.father;
      datarecord.brother=row1.brother;
      datarecord.sister=row1.sister;
      datarecord.paternal=row1.paternal;
      datarecord.maternal=row1.maternal;
      recordsList.push(datarecord);
      });
      postData.family_history_txn_dtls = recordsList;
      res.end(JSON.stringify(postData));
    }
    catch(err){
      throw new Error(err);
    }
  }catch(err){
      throw new Error(err);
    }
  },
getAlld:async (req, res)=>{
  try{
  const results=await pool.query('select * from family_diseases');
      res.end(JSON.stringify(results));
  }
  catch(err){
    throw new Error(err);
  }
},
update:async (req, res)=>{
  try{    
  const results=await pool.query("update family_history_txn set additional_notes=? where id=?",[req.body.Notes,req.body.id]);
  const resultss=await pool.query("delete from family_history_txn_dtls where family_history_txn_id=?",[req.body.id]);  
  var dtls = req.body.data;   
  // @ts-ignore
  //var txn_id = results.insertId;
  for(var attributename in dtls){ 
  try{
  const results=await pool.query("Insert into family_history_txn_dtls(family_history_txn_id,mother,father,brother,sister,paternal,\
  maternal,family_disease_id,created_by,created_on) VALUES('"+req.body.id+"','"+
  dtls[attributename]['mother']+"','"+
  dtls[attributename]['father']+"','"+
  dtls[attributename]['brother']+"','"+
  dtls[attributename]['sister']+"','"+
  dtls[attributename]['paternal']+"','"+
  dtls[attributename]['maternal']+"','"+dtls[attributename]['family_disease_id']+"','"+req.body.createdby+"','"+req.body.date+"')");               
  }
  catch(err){
      throw new Error(err);
  }
  
  }
      res.end(JSON.stringify(results));
    }
  catch(err){
      throw new Error(err);
  }
      
},
create:async (req, res)=>{
  try{
    const results=await pool.query("Insert into family_history_txn(medical_record_no,additional_notes) VALUES('"+req.body.mrno+"','"+req.body.Notes+"')");
    var dtls = req.body.data;   
    // @ts-ignore
    var txn_id = results.insertId;
    for(var attributename in dtls){
    try{
    const results=await pool.query("Insert into family_history_txn_dtls(family_history_txn_id,mother,father,brother,sister,paternal,\
    maternal,family_disease_id,created_by,created_on) VALUES('"+txn_id+"','"+
    dtls[attributename]['mother']+"','"+
    dtls[attributename]['father']+"','"+
    dtls[attributename]['brother']+"','"+
    dtls[attributename]['sister']+"','"+
    dtls[attributename]['paternal']+"','"+
    dtls[attributename]['maternal']+"','"+dtls[attributename]['family_disease_id']+"','"+req.body.createdby+"','"+req.body.date+"')");               
        res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
    }
        res.end(JSON.stringify(results));
    }
    catch(err){
        throw new Error(err);
    }
}
};
module.exports = editfamilyhistory;