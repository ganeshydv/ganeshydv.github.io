
import { ruleOneCOndtion, rulleTwoCondition } from './customRules.constant';
import { CustomRule } from './customRules';
import { Rools } from 'rools';
import { UseFacts_1,UseFacts_2 } from './customFact';
import { IDatabase, UserDB } from './entity/user.db';
import config from './db.config';
import { DataSource } from 'typeorm';
async function start() {

    // get db config
    const dbConfig:IDatabase = config();

    // configure db
    UserDB.configureDatabase(dbConfig);
    // create db connection
    const userDbConnection: DataSource= await UserDB.getConnection();
    console.log('userDb connected...');
    console.log('Rools Engine started');

    // create a new instance of Rools
    const userRepo = userDbConnection.getRepository("User");
    const rools = new Rools();

    // create new CustomRule
    let rule1= new CustomRule(ruleOneCOndtion,userRepo)
    let rule2= new CustomRule(rulleTwoCondition,userRepo)
    //register custom rules
    rools.register(
        [rule1,rule2]
    );

    //evaluate
    rools.evaluate(UseFacts_1);
    rools.evaluate(UseFacts_2);
    console.log('Rools Engine finished');

}


start();