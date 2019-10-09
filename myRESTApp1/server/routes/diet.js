var pool=require('./database.js');
var diet= {
    
     getAll: async function(req, res){
       try{
        const results=await pool.query('select diet_id,diet_name,active from  diet');
            res.end(JSON.stringify(results));
       }
       catch(error) {
        throw new Error(error);
        }
        },
    
     getOne: async function(req, res) {
        try{
        const results=await pool.query('select * from diet where diet_id=?', [req.params.id]);
        res.end(JSON.stringify(results));
        }
      catch(error){
        throw new Error(error);
      }
     },
    
     create: function(req, res) {
        var postData  = req.body;
        console.log(req.body);
        //console.log(req.body.id);
       console.log(postData);
        pool.query('INSERT INTO diet set ?',postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
      //  console.log("hai");
        });
     },
    
     update: function(req, res) {
       console.log(req.body);
        pool.query('update diet set diet_name=?,updated_by=?,updated_on=?,active=? where diet_id=?',  [req.body.diet_name,req.body.updated_by,req.body.updated_on,req.body.active,req.body.diet_id], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
            console.log("hai");
          });
     },
    
     delete: function(req, res) {
        console.log(req.params.id);
        pool.query('DELETE FROM  diet WHERE `diet_id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
      });
     }
   };
    
  
   module.exports = diet;