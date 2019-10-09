var pool = require('./database.js');
var allergystxn = {
getAll: async (req, res) => {
    try {
      const results = await pool.query('select * from  allergies');
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
getTxn: async (req, res) => {
  try {
    const postData = {};
    var rowdata={};
    var result=await pool.query('select * from allergys_txn where medical_record_no= ?',[req.params.mrno]);
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      rowdata.id=row.id;
      console.log(rowdata.id);
      rowdata.medical_record_no=row.medical_record_no;
      rowdata.additional_notes=row.additional_notes;
      });
    postData.allergys_txn=rowdata;
    try{
    var results = await pool.query('select allergys_txn_dtls.id,allergys_txn_dtls.allergys_id,allergys_txn_dtls.allergys_txn_id,allergys_txn_dtls.description,allergies.allergy_name from allergys_txn_dtls,allergies where allergies.allergy_id=allergys_txn_dtls.allergys_id and allergys_txn_dtls.allergys_txn_id=?',[rowdata.id]);
    postData.allergys_txn_dtls = results;
    console.log(postData);
    res.end(JSON.stringify(postData));
    }catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
},

getDtls: async (req, res) => {
    try {
      const results = await pool.query('select allergys_txn_dtls.id,allergies.allergy_name,allergys_txn_dtls.allergys_txn_id,allergys_txn_dtls.description,txn.medical_record_no,txn.additional_notes from allergies, allergys_txn_dtls,allergys_txn txn where allergys_txn_dtls.allergys_id=allergies.allergy_id and txn.id=allergys_txn_dtls.allergys_txn_id');
      console.log(results);
      res.end(JSON.stringify(results));
     } catch (error) {
      throw new Error(error);
    }
  },
getallergys: async (req, res) => {
    console.log(req);
      try {
      const results = await pool.query('select id,allergy_name from allergies where id=?', [req.params.id]);
      console.log(results);
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
createTxns:async (req, res) => {
     try {
       console.log(req.body);
     const results = await pool.query("Insert into allergys_txn(medical_record_no,additional_notes) VALUES('" + req.body.medical_record_no + "','" + req.body.additional_notes + "')");
     console.log(results);
     var bodys=req.body.dtls;
     res.end(JSON.stringify(results));
    // @ts-ignore
    var insid=results.insertId;
    var result = await pool.query("Insert into allergys_txn_dtls(allergys_txn_id,allergys_id,description,created_by,created_on) VALUES(" + insid  + ",'" + bodys.allergys_id  + "','" + bodys.description  + "','" + bodys.updated_by + "','" + bodys.updated_on + "')");
    res.end(JSON.stringify(results));
     }
    catch (error) {
    throw new Error(error);
  }
},
createOneTxn:async (req, res) => {
    try {
      var results = await pool.query("Insert into allergys_txn(medical_record_no,additional_notes) VALUES('" + req.body.medical_record_no + "','" + req.body.additional_notes + "')");
      res.end(JSON.stringify(results));
    }catch (error) {
      throw new Error(error);
    }
},
update: async (req, res) => {
  console.log("put-------------");
    try {
      const results = await pool.query("update allergys_txn set additional_notes=? where id=?", [req.body.Notes, req.body.tid]);
      console.log(results);
      res.end(JSON.stringify(results));
      var dtls = req.body.data;
      console.log(dtls.length);
      //@ts-ignore
      var txn_id = results.insertId;
        try {
        for (var attributename in dtls) {
          console.log(dtls[attributename]['description']);
          const results = await pool.query("update allergys_txn_dtls set allergys_txn_id=?,allergys_id=?,description=?,updated_by=?,updated_on=? where id=?", [dtls[attributename]['allergys_txn_id'], dtls[attributename]['allergys_id'], dtls[attributename]['description'], dtls[attributename]['updated_by'], dtls[attributename]['updated_on'], req.body.id]);
        console.log(results);
        res.end(JSON.stringify(results));
        }
      }
        catch (error) {
        throw new Error(error);
      }
    }
      catch (error) {
      throw new Error(error);
     }
  },
createDtlsCreate: async (req, res) => {
    try {
      var result = await pool.query('UPDATE allergys_txn SET additional_notes=? where id=?', [req.body.additional_notes,req.body.allergys_txn_id]);
      res.end(JSON.stringify(result));
      //var txn_id = results.insertId;
      var results = await pool.query("Insert into allergys_txn_dtls(allergys_txn_id,allergys_id,description,updated_by,updated_on) VALUES(" +req.body.allergys_txn_id+ ",'" +req.body.allergys_id+ "','" +req.body.description+ "','" +req.body.updated_by+ "','" +req.body.updated_on+ "')");
      res.end(JSON.stringify(results));
    } catch (error) {
      throw new Error(error);
    }
  },
delete: async (req, res) => {
    try {
      var results = await pool.query('DELETE FROM allergys_txn_dtls WHERE id=?', [req.body.id]);
      var Alter = await pool.query('ALTER TABLE allergys_txn_dtls AUTO_INCREMENT = 1');
      res.end(JSON.stringify(results));
    } catch (err) {
      throw new Error(err);
    } 
  }
};

module.exports = allergystxn;