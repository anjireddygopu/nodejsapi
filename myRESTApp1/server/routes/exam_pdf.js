const pool = require('./database.js');
const pdf = {
  getAll: async (req, res) => {
    try {
      const postData = {};
      var allergy_list = [];
      var habit_list = [];
      var immunization_list = [];
      var past_history = [];
      var family_recordsList = [];
      var chief_complaints = [];
      var sign_list = [];
      var symptoms_list = [];
      var exam_list = [];
      var diet_list = [];
      var drug_list = [];
      var disease_list = [];
      var test_list = [];
      var patient_list=[];
      var allergy = "select allergies.*,txn.* from allergies, allergys_txn_dtls txn where allergies.allergy_id=txn.allergys_id";
      const allergy_results = await pool.query(allergy);
      Object.keys(allergy_results).forEach(function (allergy_key) {
        var allergy_record = {};
        var row = allergy_results[allergy_key];
        allergy_record.allergy_name = row.allergy_name;
        allergy_record.description = row.description;
        allergy_list.push(allergy_record);
      });
      postData.allergy = allergy_list;
      var habit = "select habits.*,txn.* from habits, habits_txn_dtls txn where habits.habit_id=txn.habit_id";
      const habit_results = await pool.query(habit);
      Object.keys(habit_results).forEach(function (habit_key) {
        var habit_record = {};
        var row = habit_results[habit_key];
        habit_record.habit_name = row.habit_name;
        habit_record.description = row.description;
        habit_list.push(habit_record);
      });
      postData.habit_txn_dtls = habit_list;
      var immunization = "select dtls.*,immunization.immunization_name from patient_immunization_txn_dtls dtls,immunization where dtls.immunization_id=immunization.immunization_id";
      const immunization_results = await pool.query(immunization);
      Object.keys(immunization_results).forEach(function (immunization_key) {
        var immunization_record = {};
        var row = immunization_results[immunization_key];
        immunization_record.immunization_name = row.immunization_name;
        immunization_record.dose_amount = row.dose_amount;
        immunization_record.dose_unit = row.dose_unit;
        immunization_list.push(immunization_record);
      });
      postData.immunization = immunization_list;
      var pasthistory = "select * from pasthistory";
      const past_results = await pool.query(pasthistory);
      Object.keys(past_results).forEach(function (past_key) {
        var past_record = {};
        var row = past_results[past_key];
        past_record.medical_history = row.medical_history;
        past_record.surgical_history = row.surgical_history;
        past_record.medication_history = row.medication_history;
        past_history.push(past_record);
      });
      postData.pasthistory = past_history;
      var family_history = "select family_diseases.*,txn.* from family_diseases, family_history_txn_dtls txn where family_diseases.id=txn.family_disease_id";
      const history_result = await pool.query(family_history);
      Object.keys(history_result).forEach(function (family_key) {
        var datarecord_family = {};
        var row = history_result[family_key];
        datarecord_family.id = row.id;
        datarecord_family.disease_name = row.disease_name;
        datarecord_family.mother = row.mother;
        datarecord_family.father = row.father;
        datarecord_family.brother = row.brother;
        datarecord_family.sister = row.sister;
        datarecord_family.paternal = row.paternal;
        datarecord_family.maternal = row.maternal;
        family_recordsList.push(datarecord_family);
      });
      postData.family = family_recordsList;
      var complaint = "select * from chiefcomplaint where medical_record_no='"+req.params.mrno+"' and episode_id='"+req.params.eid+"' and visit_id='"+req.params.vid+"'";
      const complaint_results = await pool.query(complaint);
      Object.keys(complaint_results).forEach(function (complaint_key) {
        var complaint_record = {};
        var row = complaint_results[complaint_key];        
        complaint_record.chief_complaint = row.chief_complaint;
        chief_complaints.push(complaint_record);
      });
      postData.complaint = chief_complaints;
      var sign = "select signs.*,dtls.*,txn.* from signs,sign_txn_dtls  dtls ,sign_txn  txn where signs.id=dtls.sign_id and txn.id=dtls.sign_txn_id and medical_record_no='"+req.params.mrno+"' and episode_id='"+req.params.eid+"' and visit_id='"+req.params.vid+"'";
      const sign_results = await pool.query(sign);
      Object.keys(sign_results).forEach(function (sign_key) {
        var sign_record = {};
        var row = sign_results[sign_key];     
        sign_record.sign_name = row.sign_name;
        sign_record.description = row.description;
        sign_list.push(sign_record);
      });
      postData.sign = sign_list;
      var symptom = "select symptoms.*,txn.* ,dtls.* from symptoms, symptoms_txn_dtls dtls,symptoms_txn txn where symptoms.id=dtls.symptoms_id and txn.id=dtls.symptoms_txn_id and medical_record_no='"+req.params.mrno+"' and episode_id='"+req.params.eid+"' and visit_id='"+req.params.vid+"' ";
      const symptom_results = await pool.query(symptom);
      Object.keys(symptom_results).forEach(function (symptom_key) {
        var symptom_record = {};
        var row = symptom_results[symptom_key];        
        symptom_record.symptom_name = row.symptom_name;
        symptom_record.description = row.description;
        symptoms_list.push(symptom_record);
      });
      postData.symptom = symptoms_list;
      var exam = "select dtls.*,txn.* from physical_exam_txn_dtls dtls,physical_exam_txn txn where dtls.physical_exam_txn_id=txn.id and medical_record_no='"+req.params.mrno+"' and episode_id='"+req.params.eid+"' and visit_id='"+req.params.vid+"'";
      const exam_results = await pool.query(exam);
      Object.keys(exam_results).forEach(function (exam_key) {
        var exam_record = {};
        var row = exam_results[exam_key];
        exam_record.exam_type = row.exam_type;
        exam_record.exam_specific = row.exam_specific;
        exam_record.status = row.status;
        exam_record.description = row.description;
        exam_record.exam_progress = row.exam_progress;
        exam_record.exam_date = row.exam_date;
        exam_list.push(exam_record);
      });
      postData.exam_txn_dtls = exam_list;
      var diet = "select dtls.*,txn.* from diet_details_txn_dtls dtls,diet_details_txn txn where txn.txn_id=dtls.txn_id and medical_record_no='"+req.params.mrno+"' and episode='"+req.params.eid+"' and visit='"+req.params.vid+"' ";
      const diet_results = await pool.query(diet);
      Object.keys(diet_results).forEach(function (diet_key) {
        var diet_record = {};
        var row = diet_results[diet_key];
        diet_record.diet_name = row.diet_name;
        diet_list.push(diet_record);
      });
      postData.diet_details_txn_dtls = diet_list;
      var drug =  "select dtls.*,txn.* from drug_details_txn_dtls dtls,drug_details_txn txn where txn.txn_id=dtls.txn_id and medical_record_no='"+req.params.mrno+"' and episode='"+req.params.eid+"' and visit='"+req.params.vid+"' ";
      const drug_results = await pool.query(drug);
      Object.keys(drug_results).forEach(function (drug_key) {
        var drug_record = {};
        var row = drug_results[drug_key];     
        drug_record.drug_name = row.drug_name;
        drug_list.push(drug_record);
      });
      postData.drug_details_txn_dtls = drug_list;
      var disease = "select dtls.* ,txn.* from diseasechild dtls,notes txn where dtls.id=txn.id and medical_record_no='"+req.params.mrno+"' and episode_id='"+req.params.eid+"' and visit_id='"+req.params.vid+"' ";
      const disease_results = await pool.query(disease);
      Object.keys(disease_results).forEach(function (disease_key) {
        var disease_record = {};
        var row = disease_results[disease_key];
        disease_record.disease_name = row.disease_name;
        disease_list.push(disease_record);
      });
      postData.diseasechild = disease_list;
      var test = "select dtls.*,txn.* from test_details_txn_dtls dtls,test_details_txn txn where dtls.txn_id=txn.txn_id and medical_record_no='"+req.params.mrno+"' and episode='"+req.params.eid+"' and visit_id='"+req.params.vid+"'";
      const test_results = await pool.query(test);
      Object.keys(test_results).forEach(function (test_key) {
        var test_record = {};
        var row = test_results[test_key];
        test_record.test_name = row.test_name;
        test_list.push(test_record);
      });
      postData.test_details_txn_dtls = test_list;
      
      var patientquery="select first_name,last_name,gender from patient_registration where record_no='"+req.params.mrno+"'";
      const patient_dtls= await pool.query(patientquery);
      Object.keys(patient_dtls).forEach(function (patient_key) {
        var patient_record= {};
        var row = patient_dtls[patient_key];
        patient_record.first_name = row.first_name;
        patient_record.last_name = row.last_name;
        patient_record.gender = row.gender;
        patient_list.push(patient_record);
      });
      postData.patient = patient_list;
      res.end(JSON.stringify(postData));
    } catch (err) {
      throw new Error(err);
    }
  },
}
module.exports = pdf;