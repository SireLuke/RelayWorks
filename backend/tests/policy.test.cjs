const test=require("node:test"); const assert=require("node:assert/strict");
const workforce=require("../dist/policy/workforce441.js"); const par=require("../dist/policy/par.js");
test("4-4-1 accepts voluntary plan up to 9-hour ceiling",()=>assert.equal(workforce.validateShiftPlan({primaryHours:4,secondaryOrEducationHours:4,transitOrIntakeHours:1,acceptedVoluntarily:true}).valid,true));
test("4-4-1 rejects non-voluntary and over-ceiling plans",()=>{assert.equal(workforce.validateShiftPlan({primaryHours:4,secondaryOrEducationHours:4,transitOrIntakeHours:1,acceptedVoluntarily:false}).valid,false);assert.equal(workforce.validateShiftPlan({primaryHours:5,secondaryOrEducationHours:4,transitOrIntakeHours:1,acceptedVoluntarily:true}).valid,false)});
test("PAR target float is population times 1.35 times availability",()=>{assert.equal(par.calculateTargetFloat(1000,0.5),675);assert.equal(par.calculateTargetFloat(1000,0),0)});
test("PAR fee is 0.02 percent",()=>{assert.equal(par.calculateTransactionFee(100),0.02);assert.equal(par.calculateTransactionFee(1000),0.2)});
test("marketplace cap is verified net cost plus 15 percent",()=>assert.equal(par.maximumMarketplacePrice(100),115));
test("availability smoothing and domain checks work",()=>{assert.equal(par.smoothResourceAvailability(0.8,0.4,0.5),0.6000000000000001);assert.throws(()=>par.calculateTargetFloat(100,1.1),RangeError)});
