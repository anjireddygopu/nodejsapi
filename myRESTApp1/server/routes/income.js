
var pool=require('./database.js');
var patients= {

getAll: async function(req, res){
try {
const results = await pool.query('select income_group_id,income_group_name,active from  income_groups');
console.log(results);
res.end(JSON.stringify(results));
} catch(error) {
throw new Error(error);
}
},

getOne: async function(req, res) {
  try{
        const results= await pool.query('select * from income_groups where income_group_id=?',[req.params.id]);
       console.log(results);
        res.end(JSON.stringify(results));
  }
  catch(error){
    throw new Error(error);
    }
   },

    
     create: async function(req, res) {
      try{  
      var postData  = req.body;
       const results=await pool.query('INSERT INTO income_groups set ?',postData);
       
        res.end(JSON.stringify(results));
      }
      catch(error){
        throw new Error(error);
        }
     },
    
     update: async function(req, res) {
       try{
        const results=await pool.query('update income_groups set income_group_name=?,updated_by=?,updated_on=?,active=? where income_group_id=?',  [req.body.income_group_name,req.body.updated_by,req.body.updated_on,req.body.active,req.body.income_group_id]);
            
            res.end(JSON.stringify(results));
        }
       catch(error)
       {
         throw new Error(error);   
      }
     },
    
     
   };
     module.exports = patients;