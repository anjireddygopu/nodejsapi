var express = require('express');
var cors = require('cors');
var router = express.Router();
var mobileotp = require('./mobileotp.js');
var emailotp = require('./emailotp.js');
var olduserlogin = require('./olduserlogin.js');
var auth = require('./auth.js');
var countries= require('./countries.js');
var States= require('./States.js');
var Districts= require('./Districts.js');
var Towns= require('./Towns.js');
var Zips= require('./Zips.js');
var user = require('./users.js');
var languages = require('./languages.js');
var nationality=require('./nationality.js');
var bloodgroups = require('./bloodgroups.js');
var occupation  = require('./occupation.js');
var drug = require('./drug.js');
var diseases = require('./Diseases.js');
var dosage = require('./dosage.js');
var testgroup = require('./test-group.js');
var test = require('./patient.js');
var religion = require('./religion.js');
var income = require('./income.js');
var diet=require('./diet.js');
var units = require('./measure.js');
var allergies = require('./allergies.js');
var habits = require('./habits.js');
var specialities = require('./specialities.js');
var salutation = require('./salutation.js');
var immunization= require('./immunization.js');
var patient=require('./patients.js');
var facilities = require('./facilities.js');
var satellite= require('./satellite.js');
var facilitator=require('./facilitator.js');
var doctor=require('./doctor.js');
var vitals = require('./vitals.js');
var chiefcomplaint = require('./chiefcomplaint.js');
var pasthistory = require('./pasthistory.js');
var edit = require('./edit.js');
var editfamilyhistory=require('./editfamilyhistory.js');
var patient_immunization_txn_dtls1= require('./patient_immunization_txn_dtls1.js');
var habitstxn = require('./habittxn.js');
var editsigns = require('./signedit.js');
var editsymptoms = require('./symptomedit.js');
var labtest=require('./labtest.js');
var drugtxn = require('./drugtxn.js');
var diettxn = require('./diettxn.js');
var allergystxn = require('./allergytxn.js');
var diagnosis =require('./diagnosis.js');
var details=require('./expert-center-functionality.js');
var feedback=require('./feedback.js');
var upload=require('./fileuploads.js');
var pdf = require('./exam_pdf.js');
var expertauth = require('./expertauth.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/logout', auth.logoutget);
router.post('/expertlogin',expertauth.login);
router.post('/expertlogout',expertauth.logoutget);

router.put('/forgetpassword',auth.forgetpassword);
router.post('/mobilenumber',cors(),mobileotp.create);
router.get('/otp-from-db',cors(),mobileotp.get);

router.post('/email',cors(),emailotp.create);
router.get('/otp-from-dba',cors(),emailotp.get);

router.get('/api/v1/olduserlogin/:+olduser_name',olduserlogin.getOne);

router.get('/api/v1/upload/:mrno/:eid/:vid',upload.getAll);
router.get('/api/v1/upload/:id',upload.getOne);
router.post('/api/v1/upload/',upload.create);

router.get('/api/v1/exam_pdf/:mrno/:eid/:vid', pdf.getAll);
router.get('/api/v1/cases-details/:id',details.getAll);
 router.get('/api/v1/doctor-details/:id',details.getOne);
router.get('/api/v1/expert-center-details',details.getTwo);
router.post('/api/v1/case-details/post',details.create);
router.get('/api/v1/patient-case-details/:id',details.getcase);


router.get('/api/v1/feedback/:mrno/:eid/:vid',feedback.getAll);
router.post('/api/v1/feedback/post',feedback.create);


router.get('/api/v1/allergystxn', allergystxn.getAll);
router.get('/api/v1/allergystxn-txn/:mrno', allergystxn.getTxn);
router.get('/api/v1/allergystxn-sel/', allergystxn.getDtls);
router.post('/api/v1/allergystxn-createDtls/:id',allergystxn.createTxns);
router.post('/api/v1/allergystxn-createOneDtls',allergystxn.createOneTxn);
router.put('/api/v1/allergystxn/update', allergystxn.update);
router.post('/api/v1/allergystxn-dtls-add', allergystxn.createDtlsCreate);
router.delete('/api/v1/allergystxn/:id', allergystxn.delete);

router.get('/api/v1/drugtxn/all/:id1', drugtxn.getAll);
router.get('/api/v1/drugtxn', drugtxn.getAll1);
router.get('/api/v1/drugtxn/:mrno/:eid/:vid', drugtxn.getOne);
router.post('/api/v1/drugtxn/', drugtxn.create);
router.put('/api/v1/drugtxn/update', drugtxn.update);

//drug

 
router.get('/api/v1/diettxn/all/:id1', diettxn.getAll);
router.get('/api/v1/diettxn', diettxn.getAll1);
router.get('/api/v1/diettxn/:mrno/:eid/:vid', diettxn.getOne);
 router.post('/api/v1/diettxn/', diettxn.create);
 router.put('/api/v1/diettxn/update', diettxn.update);

 router.get('/api/v1/labtest/:mrno/:eid/:vid',labtest.getAll2);
router.get('/api/v1/labtest/labtest:id', labtest.getAll);
router.post('/api/v1/labtest/', labtest.create);
router.put('/api/v1/labtest/update', labtest.update);


router.get('/api/v1/habitstxn', habitstxn.getAll);
router.get('/api/v1/habitstxn-txn/:mrno', habitstxn.getTxn);
router.get('/api/v1/habitstxn-dtls', habitstxn.getDtls);
router.get('/api/v1/habitstxn/:id', habitstxn.getOne);
router.get('/api/v1/habitstxn-one/:id', habitstxn.getHabit);
router.post('/api/v1/habitstxn-txn/table', habitstxn.createTxns);
router.post('/api/v1/habitstxn-dtls/', habitstxn.createDtls);
router.post('/api/v1/habitstxn-dtls-add', habitstxn.createDtlsCreate);
router.put('/api/v1/habitstxn-create/:id', habitstxn.createTxn);
router.put('/api/v1/habitstxn/:id', habitstxn.update);
router.delete('/api/v1/habitstxn-delete/:id', habitstxn.delete);

router.get('/api/v1/patient_immunization_txn_dtls1/:mrno', patient_immunization_txn_dtls1.getAll);
router.put('/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1',patient_immunization_txn_dtls1.update);
router.put('/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1', patient_immunization_txn_dtls1.update1);
router.post('/api/v1/patient_immunization_txn_dtls1/', patient_immunization_txn_dtls1.create);
router.post('/api/v1/patient_immunization_txn_dtls1/create', patient_immunization_txn_dtls1.create1);
router.delete('/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1/:id', patient_immunization_txn_dtls1.delete);

router.get('/api/v1/editfamilyhistoryd', editfamilyhistory.getAlld);
router.get('/api/v1/editfamilyhistory/:mrno', editfamilyhistory.getAll);
router.put('/api/v1/editfamilyhistory/editfamilyhistory', editfamilyhistory.update);
router.post('/api/v1/editfamilyhistory/', editfamilyhistory.create);

router.get('/api/v1/edit/:mrno/:eid/:vid', edit.getAll);
router.post('/api/v1/edit/', edit.create);
router.post('/api/v1/edit-txn/table', edit.createTxns);
router.put('/api/v1/edit/update', edit.update);
router.put('/api/v1/edit-create', edit.createTxn);
router.delete('/api/v1/delete/:id', edit.delete);


router.get('/api/v1/vitals', vitals.getAll);
router.get('/api/v1/vitals/:mrno/:eid/:vid', vitals.getOne);
router.post('/api/v1/vitals/', vitals.create);
router.put('/api/v1/vitals/update', vitals.update);
router.delete('/api/v1/vitals/:id', vitals.delete);

router.get('/api/v1/doctor', doctor.getAll);
router.get('/api/v1/expert', doctor.getall1);
router.get('/api/v1/doctor/:id', doctor.getOne);
router.post('/api/v1/doctor/', doctor.create);
router.put('/api/v1/doctor/update', doctor.update);

router.get('/api/v1/facilitator', facilitator.getAll);
router.get('/api/v1/facilitator/:id', facilitator.getOne);
router.post('/api/v1/facilitator/', facilitator.create);
router.put('/api/v1/facilitator/update', facilitator.update);

router.get('/api/v1/satellite', satellite.getAll);
router.get('/api/v1/satellite/:id', satellite.getOne);
router.post('/api/v1/satellite/', satellite.create);
router.put('/api/v1/satellite/update', satellite.update);


router.get('/api/v1/facilities', facilities.getAll);
router.get('/api/v1/facilities/:id', facilities.getOne);
router.post('/api/v1/facilities/', facilities.create);
router.put('/api/v1/facilities/update',facilities.update);
 
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/countries',countries.getAll);
router.get('/api/v1/countries/:id',countries.getOne);
router.post('/api/v1/countries', countries.create);
router.put('/api/v1/countries/', countries.update);




/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/States', States.getAll);
router.get('/api/v1/States/:id',States.getOne);
router.get('/api/v1/States/States/:country_id',States.getTwo);
router.post('/api/v1/States', States.create);
router.put('/api/v1/States/', States.update);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/Districts', Districts.getAll);
router.get('/api/v1/Districts/:id',Districts.getOne);
router.get('/api/v1/Districts/Districts/:id',Districts.getTwo);
router.get('/api/v1/Districts/Districts/Districts/:state_id',Districts.getThree);
router.post('/api/v1/Districts', Districts.create);
router.put('/api/v1/Districts/', Districts.update);



/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/Towns', Towns.getAll);
router.get('/api/v1/Towns/:id',Towns.getOne);
router.get('/api/v1/Towns/Towns/:district_id',Towns.getTwo);
router.post('/api/v1/Towns',Towns.create);
router.put('/api/v1/Towns/',Towns.update);



/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/Zips',Zips.getAll);
router.get('/api/v1/Zips/:id',Zips.getOne);
router.get('/api/v1/Zips/Zips/:id',Zips.getThree);
router.post('/api/v1/Zips',Zips.create);
router.put('/api/v1/Zips/',Zips.update);
 
router.get('/api/v1/languages', languages.getAll);
router.get('/api/v1/languages/:id', languages.getOne);
router.post('/api/v1/languages/', languages.create);
router.put('/api/v1/languages/:id', languages.update);
/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/api/v1/nationality', nationality.getAll);
router.get('/api/v1/nationality/:id', nationality.getOne);
router.post('/api/v1/nationality/', nationality.create);
router.put('/api/v1/nationality/:id', nationality.update);




router.get('/api/v1/bloodgroups', bloodgroups.getAll);
router.get('/api/v1/bloodgroup/:bloodgroup_id', bloodgroups.getOne);
router.post('/api/v1/bloodgroup/', bloodgroups.create);
router.put('/api/v1/bloodgroup', bloodgroups.update);
router.delete('/api/v1/bloodgroup/:bloodgroup_id', bloodgroups.delete);
 
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/occupation', occupation.getAll);
router.get('/api/v1/occupation/:occupation_id', occupation.getOne);
router.post('/api/v1/occupation/', occupation.create);
router.put('/api/v1/occupation', occupation.update);
router.delete('/api/v1/occupation/:occupation_id', occupation.delete);

router.get('/api/v1/drug', drug.getAll);
router.get('/api/v1/drug/:id', drug.getOne);
router.post('/api/v1/drug/', drug.create);
router.put('/api/v1/drug/update', drug.update);
router.delete('/api/v1/drug/:id', drug.delete);


router.get('/api/v1/diseases', diseases.getAll);
router.get('/api/v1/diseases/all/:id1', diseases.getAll2);
router.get('/api/v1/diseases/:id', diseases.getOne);
router.post('/api/v1/diseases/', diseases.create);
router.put('/api/v1/diseases/:id', diseases.update);
router.delete('/api/v1/diseases/:id', diseases.delete);


// router.get('/api/v1/diagnosis/all/:id1', diagnosis.getAll);
router.get('/api/v1/diagnosis/:mrno/:eid/:vid', diagnosis.getOne);
router.post('/api/v1/diagnosis/', diagnosis.create);
router.put('/api/v1/diagnosis', diagnosis.update);
// router.delete('/api/v1/diseases/:id', diseases.delete);

router.get('/api/v1/dosage',dosage.getAll);
router.get('/api/v1/dosage/:id', dosage.getOne);
router.post('/api/v1/dosage/', dosage.create);
router.put('/api/v1/dosage/update', dosage.update);


router.get('/api/v1/test-group', testgroup.getAll);
router.get('/api/v1/test-group/:id', testgroup.getOne);
router.post('/api/v1/test-group/', testgroup.create);
router.put('/api/v1/test-group/:id', testgroup.update);
router.delete('/api/v1/test-group/:id', testgroup.delete);

//test-master

router.get('/api/v1/test', test.getAll);
router.get('/api/v1/test/:id', test.getOne);
router.get('/api/v1/dropdown', test.getTgOne);
router.post('/api/v1/test/', test.create);
router.put('/api/v1/test/:id', test.update);
router.delete('/api/v1/test/:id', test.delete);


router.get('/api/v1/religion', religion.getAll);
router.get('/api/v1/religion/:id', religion.getOne);
router.post('/api/v1/religion/', religion.create);
router.put('/api/v1/religion/update', religion.update);
router.delete('/api/v1/religion/:id', religion.delete);




router.get('/api/v1/income', income.getAll);
router.get('/api/v1/income/:id', income.getOne);
router.post('/api/v1/income/', income.create);
router.put('/api/v1/income/update', income.update);
 
 
 /*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/diet', diet.getAll);
router.get('/api/v1/diet/:id', diet.getOne);
router.post('/api/v1/diet/', diet.create);
router.put('/api/v1/diet/update', diet.update);
router.delete('/api/v1/diet/:id', diet.delete);


router.get('/api/v1/units', units.getAll);
router.get('/api/v1/units/:id', units.getOne);
router.post('/api/v1/units/', units.create);
router.put('/api/v1/units/update', units.update);


router.get('/api/v1/allergies', allergies.getAll);
router.get('/api/v1/allergies/:id', allergies.getOne);
router.post('/api/v1/allergies/', allergies.create);
router.put('/api/v1/allergies/update', allergies.update);
router.delete('/api/v1/allergies/:id', allergies.delete);

router.get('/api/v1/habits', habits.getAll);
router.get('/api/v1/habits/:id', habits.getOne);
router.post('/api/v1/habits/', habits.create);
router.put('/api/v1/habits/update', habits.update);
router.delete('/api/v1/habits/:id', habits.delete);

router.get('/api/v1/edit-signs',editsigns.getAll);
router.get('/api/v1/edit-signs/:mrno/:epno/:vid', editsigns.getTxn);
router.get('/api/v1/edit-signs-sel/', editsigns.getDtls);
router.get('/api/v1/edit-signs-seltx/', editsigns.getsigns);
router.get('/api/v1/edit-signs-seltxn/', editsigns.getOne);
router.post('/api/v1/edit-signs-txn/', editsigns.createDtls);
router.post('/api/v1/edit-signs-txn/data', editsigns.createTxns);
router.put('/api/v1/edit-signs-up/:id', editsigns.update);
router.put('/api/v1/edit-signs-create/:id', editsigns.createTxn);
router.delete('/api/v1/edit-signs-delete/:id', editsigns.delete);
router.post('/api/v1/edit-signs-add/', editsigns.Create);


router.get('/api/v1/edit-symptoms', editsymptoms.getAll);
router.get('/api/v1/edit-symptoms/:mrno/:epno/:vid', editsymptoms.getTxn);
router.get('/api/v1/edit-symptoms-sel/', editsymptoms.getDtls);
router.get('/api/v1/edit-symptoms-seltx/', editsymptoms.getsymptom);
router.get('/api/v1/edit-symptoms-seltxn/', editsymptoms.getOne);
router.post('/api/v1/edit-symptoms-txn/', editsymptoms.createDtls);
router.post('/api/v1/edit-symptoms-txn/data', editsymptoms.createTxns);
router.put('/api/v1/edit-symptoms-up/:id', editsymptoms.update);
router.put('/api/v1/edit-symptoms-create/:id', editsymptoms.createTxn);
router.delete('/api/v1/edit-symptoms-delete/:id', editsymptoms.delete);
router.post('/api/v1/edit-symptoms-add/', editsymptoms.Create);

router.get('/api/v1/specialities', specialities.getAll);
router.get('/api/v1/specialities/:id', specialities.getOne);
router.post('/api/v1/specialities/', specialities.create);
router.put('/api/v1/specialities/update', specialities.update);
router.delete('/api/v1/specialities/:id', specialities.delete);

router.get('/api/v1/salutation', salutation.getAll);
router.get('/api/v1/salutation/:id', salutation.getOne);
router.post('/api/v1/salutation/', salutation.create);
router.put('/api/v1/salutation/update', salutation.update);
router.delete('/api/v1/salutation/:id', salutation.delete);

router.get('/api/v1/immunization', immunization.getAll);
router.get('/api/v1/immunization/:id', immunization.getOne);
router.post('/api/v1/immunization/', immunization.create);
router.put('/api/v1/immunization/update',immunization.update);

router.get('/api/v1/patient', patient.getAll);
router.get('/api/v1/patient/case-details', patient.getAll1);
router.get('/api/v1/patient/:id', patient.getOne);
router.post('/api/v1/patient/',patient.create);
router.post('/api/v1/patient/case',patient.createcase);
router.post('/api/v1/patient/visit',patient.createvisit);
router.put('/api/v1/patient/update', patient.update);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/chiefcomplaint', chiefcomplaint.getAll);
router.get('/api/v1/chiefcomplaint/:mrno/:eid/:vid', chiefcomplaint.getOne);
router.post('/api/v1/chiefcomplaint/', chiefcomplaint.create);
router.put('/api/v1/chiefcomplaint/put', chiefcomplaint.update);
router.delete('/api/v1/chiefcomplaint/:id', chiefcomplaint.delete);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/pasthistory', pasthistory.getAll);
router.get('/api/v1/pasthistory/:mrno', pasthistory.getOne);
router.post('/api/v1/pasthistory/', pasthistory.create);
router.put('/api/v1/pasthistory/put', pasthistory.update);
router.delete('/api/v1/pasthistory/:id', pasthistory.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);




 
module.exports = router;