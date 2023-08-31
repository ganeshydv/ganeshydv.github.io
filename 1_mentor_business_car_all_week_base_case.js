const assert = require('assert');
const sinon = require('sinon');
const ReportEngineService = require('../../src/handlers/bl/services/reportEngineService');
const FactManager = require('../../src/handlers/bl/managers/factManager');
const DynamoDa = require('../../src/handlers/da/dynamoda');
const LogManager = require('../../src/handlers/bl/managers/logManager');
const PlaylistManager = require('../../src/handlers/bl/managers/playListManager');
const MentorBL = require('../../src/handlers/bl/mentorBl');
const UtilityFunctions = require('../../src/handlers/bl/utils/utilityFunctions');
const DATA = require('./data');
const moment = require('moment');
const utils = require('./utils');
const { setTimeout } = require('timers');
let week_count = 0;



describe('App: Mentor Business  Course type: Car', () => {

  DATA.facts.mentorVersion = 'Mentor_Amazon';//Mentor_Business, Mentor,...except Mentor_Insight
  const bl = new MentorBL({ debug: true });
  const dynamoDa = new DynamoDa(true);
  const reportEngineService = new ReportEngineService();
  const factManager = new FactManager(reportEngineService, dynamoDa);
  const playlistManager = new PlaylistManager(dynamoDa);
  bl.playlistManager = playlistManager;
  bl.factManager = factManager;
  sinon.stub(LogManager, 'logError').callsFake(() => {
    return;
  });
  sinon.stub(factManager.reportEngineService, 'getReportEngineData').resolves(DATA.reportData);
  sinon.stub(playlistManager, 'getAssignedUserModules').resolves(utils.getPreviousModules());
  sinon.stub(playlistManager, 'getUpdatedCourseMap').resolves(DATA.courseMap);
  sinon.stub(playlistManager, 'assignModules').resolves({});

  //USER INFO SET UP
  DATA.facts.firstLoginTime = moment().unix()*1000;
  console.log(moment.unix(DATA.facts.firstLoginTime/1000).toLocaleString());
  console.log('week_count: ' + week_count);

  //FIRST ASSIGNMENT USER NO MODULE
  it('first assignment: it should assign all orientation modules', async () => {
    //JOB RUN TIME
    DATA.facts.runDate = moment().format('YYYY-MM-DD'); //TODAY 
    const result = await bl.execute(DATA.facts);
    
    var modules = result[0].modules;
    if (modules)
      utils.addToPreviousModules(modules);

    var toCompare = modules.map(m => UtilityFunctions.trimObject(m, ['course_master_code', 'course_code']));
    assert.equal(JSON.stringify(toCompare), JSON.stringify(DATA.orientationModules_mentor_car));
  }

  );
  

  it('week 1:  No Week 1 module bucket for any risk category.', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 1
    console.log(moment(DATA.facts.runDate).toLocaleString());
    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    utils.addToPreviousModules(modules); //won't add anything!
    assert.equal(JSON.stringify(modules), JSON.stringify([]));

  });
  it('WEEK 2-1 : FIRST 3 MONTHS: One item from week-2 sequence for the lowest score (Acceleration) regardless of risk level ', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 730); // for the first month only 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
  
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    //utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_acceleration);
    assert.equal(modules.length, 1);

  });


  it('WEEK 3 : NO item from week-3 buket for if nothing in hight risk - high risk only', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 3
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);

    if (modules)
      utils.addToPreviousModules(modules); //won't add anything!

    assert.equal(modules.length, 0);

  });

  it('WEEK 4 : One item from week-4 buket for regardless of risk level', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 4
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);

    if (modules)
      utils.addToPreviousModules(modules); //will add one
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week4);
    assert.equal(modules.length, 1);

  });

  it('WEEK 2-2 : FIRST 3 MONTHS: One item from week-2 sequence for the lowest score (Braking) regardless of risk level ', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 2;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 720); // for the first month only 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    //utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_braking);
    assert.equal(modules.length, 1);

  });

  it('WEEK 3 : One item from week-3 buket for if anything in hight risk - high risk only', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 559); // for the first month only 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 3
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log('risk_level'+DATA.facts.risk_level)
    if (modules)
      utils.addToPreviousModules(modules); //won't add anything!
    
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week3);
    assert.equal(modules.length, 1);

  });

  it('WEEK 4 : One item from week-4 buket for regardless of risk level', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 4
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);

    if (modules)
      utils.addToPreviousModules(modules); //will add one
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week4);
    assert.equal(modules.length, 1);

  });
  it('WEEK 2-3 : FIRST 3 MONTHS: One item from week-2 sequence for the lowest score (Distraction) regardless of risk level ', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 2;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 730);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 720); // for the first month only 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    //utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_distraction);
    assert.equal(modules.length, 1);

  });
  it('WEEK 3 : No item from week-3 buket for if nothing in hight risk - high risk only', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 560); // should yield medium risk 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 3
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log('risk_level'+DATA.facts.risk_level)
    if (modules)
      utils.addToPreviousModules(modules); //won't add anything!
    
   
    assert.equal(modules.length, 0);

  });
  it('WEEK 4 : One item from week-4 buket for regardless of risk level', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 4
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);

    if (modules)
      utils.addToPreviousModules(modules); //will add one
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week4);
    assert.equal(modules.length, 1);

  });

  it('WEEK 2-4 : AFTER 3 MONTHS: no item from week-2 sequence for the lowest score  on risk level is low >=710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 2;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 710); //should yield medium
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    //utils.addToPreviousModules(modules);//won't add anything!
   // assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_cornering);
    assert.equal(modules.length, 0);

  });

  it('WEEK 3 : one item from week-3 buket for if anything in hight risk - high risk only', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 559); // should yield medium risk 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 3
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log('risk_level'+DATA.facts.risk_level)
    if (modules)
      utils.addToPreviousModules(modules); 
    
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week3);
    assert.equal(modules.length, 1);

  });

  it('WEEK 4 : One item from week-4 buket for regardless of risk level', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 1;
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 4
    console.log(moment(DATA.facts.runDate).toLocaleString());
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 720); // should yield medium risk 
    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);

    if (modules)
      utils.addToPreviousModules(modules); //will add one
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week4);
    assert.equal(modules.length, 1);

  });


  it('WEEK 2-5 : AFTER 3 MONTHS: one item from week-2 sequence for the lowest score  on risk level is medium and high < 710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 2;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 709);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 710); //should yield medium
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_acceleration);
    assert.equal(modules.length, 1);

  });

  it('WEEK 2-6 : AFTER 3 MONTHS: one item from week-2 sequence for the lowest score  on risk level is medium and high < 710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 4;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 709);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 710); //should yield medium
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_braking);
    assert.equal(modules.length, 1);

  });
  it('WEEK 2-7 : AFTER 3 MONTHS: one item from week-2 sequence for the lowest score  on risk level is medium and high < 710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 4;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 709); //should yield medium
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_cornering);
    assert.equal(modules.length, 1);

  });

  it('WEEK 2-8: AFTER 3 MONTHS: one item from week-2 sequence for the lowest score  on risk level is medium and high < 710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 4;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 709); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 710); //should yield medium
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_distraction);
    assert.equal(modules.length, 1);

  });

  it('WEEK 2-9: AFTER 3 MONTHS: one item from week-2 sequence for the lowest score  on risk level is medium and high < 710', async () => {
    //JOB RUN TIME -> ADD TO THE FIRST LOGIN TIME
    week_count = week_count + 4;
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Acceleration', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Braking', 710);
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Distraction', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Cornering', 710); 
    utils.setScore(DATA.reportData[0].weeklyStats[0], 'Speed', 709); 
    DATA.facts.runDate = moment.unix(DATA.facts.firstLoginTime/1000).add(week_count, 'weeks').format('YYYY-MM-DD'); //WEEK - 2
    console.log(moment(DATA.facts.runDate).toLocaleString());

    const result = await bl.execute(DATA.facts);
    var modules = result[0].modules;
    console.log(modules);
    console.log("sequenceOrdinality:" + DATA.facts.sequenceOrdinality);
    console.log("lowestScoreCategory:" + DATA.facts.lowestScoreCategory);
    console.log("weekDiffSinceLastAssignment:" + DATA.facts.weekDiffSinceLastAssignment);
    console.log("seq_path:" + DATA.facts.params.path);
    console.log(DATA.reportData[0].weeklyStats[0].scores);
    utils.addToPreviousModules(modules);//won't add anything!
    assert.equal(modules[0].seq_path, DATA.seq_mentor_business_car_week2_speeding);
    assert.equal(modules.length, 1);

  });


setTimeout(() => {
  //utils.printPreviousModules();
}, 100);
});

