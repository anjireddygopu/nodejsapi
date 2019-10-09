const pool=require('./database.js');
const dosage = {
    
   
    getAll: async function (req, res) {
      try{
     
        const results =await pool.query('select * from dosage_master');
           console.log(results);
            res.end(JSON.stringify(results));
               } catch(error) {
                throw new Error(error);
                }
                },


    getOne:async (req, res)=> {
      console.log(req.params.id);
      try{
        const results =await pool.query('select * from dosage_master where dosage_id=?',[req.params.id]);
        console.log(results);
        res.end(JSON.stringify(results));
      } catch(error) {
        throw new Error(error);
        }
      },


  
  create:async (req, res) => {
    try{
          var postData  = req.body;
          console.log(req.body);
          //console.log(req.body.id);
         console.log(postData);
         const results=await pool.query('INSERT INTO dosage_master set ?',postData);
         // if (error) throw error;
          res.end(JSON.stringify(results));
        //  console.log("hai");
        //  });
       //},
      }catch(err) {
        throw new Error(err);
        }
        },
  

/*

     delete: function(req, res) {
        console.log(req.params.id);
        connection.query('DELETE FROM  dosage_master WHERE dosage_id=?', [req.params.dosage_id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      });
     }
   };
  */  
  update:async (req, res) => {
    try{
   console.log(req.body.uom_id);//.id+"---Id");
   const results=await pool.query('update dosage_master set dosage_description=?,active=? where dosage_id=?',[req.body.dosage_description,req.body.active,req.body.dosage_id]);
       // if (error) throw error;
        res.end(JSON.stringify(results));
        console.log("hai");
     // });
 //},
}catch(err) {
  throw new Error(err);
  }
  },
};
   module.exports = dosage