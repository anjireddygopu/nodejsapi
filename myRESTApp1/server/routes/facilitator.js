var pool = require('./database.js');
var facilitator= {  
     getAll: async (req, res)=> {
       try{
   const results=await pool.query('select  facilitator_id, first_name, last_name,personal,email_id from  facilitator');
            res.end(JSON.stringify(results));
          }
          catch (err) {
            throw new Error(err);
          }
     },
     getOne:async (req, res)=> {
       try{
     const results=await pool.query('select  * from facilitator where facilitator_id=?', [req.params.id]);
        res.end(JSON.stringify(results));
      }
      catch (err) {
        throw new Error(err);
      }
     },
     create:async (req, res)=> {
       try{
        var postData  = req.body;
     const results=await pool.query('INSERT INTO facilitator set ?',postData);
        res.end(JSON.stringify(results));
        }
        catch (err) {
          throw new Error(err);
        }
     },
     update: async (req, res) =>{
       try{
         console.log(req.body);
     const results=await pool.query('update facilitator set first_name=?,last_name=?,address_line_1=?,address_line_2=?,country=?,state=?,district=?,zip=?,email_id=?,office_contact_no=?,office_extension=?,personal=?,updated_by=?,updated_on=?,city=? where facilitator_id=?',[req.body.first_name,req.body.last_name,req.body.address_line_1,req.body.address_line_2,req.body.country,req.body.state,req.body.district,req.body.zip,req.body.email_id,req.body.office_contact_no,req.body.office_extension,req.body.personal,req.body.updated_by,req.body.updated_on,req.body.city,req.body.facilitator_id]);
            res.end(JSON.stringify(results));
            console.log(results);

         }
         catch (err) {
          throw new Error(err);
        }
     },
   };
    
  
   module.exports =facilitator;