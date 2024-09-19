
import { ruleOneCOndtion, rulleTwoCondition } from './customRules.constant';
import { CustomRule } from './customRules';
import { Rools } from 'rools';
import { UseFacts_1,UseFacts_2 } from './customFact';
function start() {
    console.log('Rools Engine started');

    // create a new instance of Rools
    const rools = new Rools();

    // create new CustomRule
    let rule1= new CustomRule(ruleOneCOndtion)
    let rule2= new CustomRule(rulleTwoCondition)
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