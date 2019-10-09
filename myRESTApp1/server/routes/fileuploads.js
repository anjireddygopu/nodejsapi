const express = require('express');
const app = express();
const formidable = require('formidable');
const util = require('util');
const fs = require('fs-extra');
const path = require("path");
const mime = require("mime-types");
const fileStoragePath = "D://EMR//FileStorage";
const fileStoragePath1 = "D:\\EMR\\FileStorage";
const pool = require('./database.js');
app.use(express.static(path.join(__dirname, 'public')));
const upload= {
  getAll:async  (req, res)=> {
    try{
    const results=await pool.query("select * from file_uploading where mr_no=? and episode_id=? and visit_id=?",[req.params.mrno,req.params.eid,req.params.vid]);
      res.end(JSON.stringify(results));
    }
    catch(err) {
      throw new Error(err);
  }
  },
  getOne:async  (req, res)=> {
    try{
    var file;
    const filename = req.params.id;
    const results=await pool.query("select * from file_uploading where document_id=?", [req.params.id]);
      //res.end(JSON.stringify(results));
      for (const i in results)
      file = fileStoragePath1 + '\\' + results[i].mr_no + '\\' + results[i].episode_id + '\\' + results[i].visit_id + '\\' + results[i].document_link;
      console.log(file);
      const refilename = path.basename(file);
      const mimetype = mime.lookup(file);
      res.setHeader('Content-disposition', 'attachment; filename=' + refilename);
      res.setHeader('Content-type', mimetype);
      fs.readFile(file, function (err, data) {
        res.end(data);
      });
    }
      catch(err) {
        throw new Error(err);
    }
  },
  create:async (req, res)=> {
    try{
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, "/images");
    var mrno;
    var eid;
    var vid;
    var dir;
    var dname;
    var fileExt;
    form.parse(req, function (err, fields, files) {
      mrno = fields.mrno;
      eid = fields.eid;
      vid = fields.vid;
      dname = fields.dname;
      console.log(dname);
      dir = fileStoragePath + '/' + mrno + '/' + eid + '/' + vid + '/';
    });
    var file_name;
    form.on('end', function (fields, files) {
      /* Temporary location of our uploaded file */
      const temp_path = this.openedFiles[0].path;
      /* The file name of the uploaded file */
       file_name = this.openedFiles[0].name;
       fileExt = this.openedFiles[0].name.split('.').pop();
       console.log(fileExt);
      if (!fs.exists(dir)) {
        fs.mkdir(dir, 0o744);
      }
      /* Location where we want to copy the uploaded file */
      const new_location = dir;
      fs.copy(temp_path, new_location + file_name, function (err,data) {
        if (err) {
          console.error(err);
        } else {
          console.log("success!")
          console.log(JSON.stringify(req.headers)); 
        }
      });
    
    const results= pool.query("insert into file_uploading(mr_no,episode_id,visit_id,document_name,document_link,content_type) values('" + mrno + "','" + eid + "','" + vid + "','" + dname + "','" + file_name + "','" + fileExt + "')");
        res.end(JSON.stringify(results)); 
      });
      }
    catch(err) {
      throw new Error(err);
  }

}
}
module.exports = upload;

