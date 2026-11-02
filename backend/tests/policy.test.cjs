const test=require("node:test"); const assert=require("node:assert/strict");
const workforce=require("../dist/policies/workforce441.js"); const par=require("../dist/policy/par.js");
test("4-4-1 accepts voluntary plan up to 9-hour ceiling",()=>assert.equal(workforce.assessWorkforce441({primaryHours:4,secondaryHours:4,logisticsHours:1,optedIn:true}).valid,true));
test("4-4-1 rejects non-voluntary and over-ceiling plans",()=>{assert.equal(workforce.assessWorkforce441({primaryHours:4,secondaryHours:4,logisticsHours:1,optedIn:false}).applicable,false);assert.equal(workforce.assessWorkforce441({primaryHours:5,secondaryHours:4,logisticsHours:1,optedIn:true}).valid,false)});
test("PAR target float is population times 1.35 times availability",()=>{assert.equal(par.calculateTargetFloat(1000,0.5),675);assert.equal(par.calculateTargetFloat(1000,0),0)});
test("PAR fee is 0.02 percent",()=>{assert.equal(par.calculateTransactionFee(100),0.02);assert.equal(par.calculateTransactionFee(1000),0.2)});
test("marketplace cap is verified net cost plus 15 percent",()=>assert.ok(Math.abs(par.maximumMarketplacePrice(100)-115)<1e-12));
test("availability smoothing and domain checks work",()=>{assert.ok(Math.abs(par.smoothResourceAvailability(0.8,0.4,0.5)-0.6)<1e-12);assert.throws(()=>par.calculateTargetFloat(100,1.1),RangeError)});

const rams=require("../dist/policy/rams.js");
test("RAMS rejects missing, out-of-range, future and malformed observations",()=>{
 assert.equal(rams.validateRamsAvailability(null).valid,false);
 assert.equal(rams.validateRamsAvailability({sourceSystem:"demo",sourceRecordId:"1",availability:1.1,observedAt:new Date().toISOString()}).valid,false);
 assert.equal(rams.validateRamsAvailability({sourceSystem:"demo",sourceRecordId:"2",availability:0.5,observedAt:"not-a-date"}).valid,false);
 assert.equal(rams.validateRamsAvailability({sourceSystem:"demo",sourceRecordId:"3",availability:0.5,observedAt:new Date(Date.now()+120000).toISOString()}).valid,false);
 assert.equal(rams.validateRamsAvailability({sourceSystem:"demo",sourceRecordId:"4",availability:0.5,observedAt:new Date().toISOString(),sourceVersion:42}).valid,false);
});
test("RAMS payload hash is deterministic and sensitive to content",()=>{
 const base={sourceSystem:"fixture",sourceRecordId:"rec-1",availability:0.5,observedAt:"2026-11-02T12:00:00.000Z"};
 assert.equal(rams.hashRamsPayload(base),rams.hashRamsPayload({...base}));
 assert.notEqual(rams.hashRamsPayload(base),rams.hashRamsPayload({...base,availability:0.6}));
});
test("PAR issuance remains explicitly disabled",()=>assert.equal(par.PAR_ISSUANCE_POLICY.enabled,false));
