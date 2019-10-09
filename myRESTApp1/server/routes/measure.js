const pool=require('./database.js');
const units = {
    
getAll: async function (req, res) {
    try{
   
      const results =await pool.query('select * from  unit_of_measure');
         console.log(results);
          res.end(JSON.stringify(results));
             } catch(error) {
              throw new Error(error);
              }
              },
    //
getOne:async (req, res)=> {
      console.log(req.params.id);
      try{
        const results =await pool.query('select * from unit_of_measure where uom_id=?',[req.params.id]);
        console.log(results);
        res.end(JSON.stringify(results));
      } catch(error) {
        throw new Error(error);
        }
      },
   //


     create:async (req, res) => {
  try{
        var postData  = req.body;
        console.log(req.body);
        //console.log(req.body.id);
       console.log(postData);
       const results=await pool.query('INSERT INTO unit_of_measure set ?',postData);
       // if (error) throw error;
        res.end(JSON.stringify(results));
      //  console.log("hai");
      //  });
     //},
    }catch(err) {
      throw new Error(err);
      }
      },



      //



      update:async (req, res) => {
        try{
       console.log(req.body.uom_id);//.id+"---Id");
       const results=await pool.query('update unit_of_measure set uom_name=?,uom_description=?,active=? where uom_id=?',[req.body.uom_name,req.body.uom_description,req.body.active,req.body.uom_id]);
           // if (error) throw error;
            res.end(JSON.stringify(results));
            console.log("hai");
         // });
     //},
    }catch(err) {
      throw new Error(err);
      }
      },
    //

/*
     delete: function(req, res) {
        console.log(req.params.id);
        const results=await pool.query('DELETE FROM  unit_of_measure WHERE uom_id=?', [req.params.uom_id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      });
     }
     */
   };
    
  
   module.exports = units;