export const WORKFORCE_441 = Object.freeze({ primaryHours:4, secondaryOrEducationHours:4, transitOrIntakeHours:1, plannedHours:9, maxShiftHours:9, voluntary:true, mandatory:false });
export interface ShiftPlan { primaryHours:number; secondaryOrEducationHours:number; transitOrIntakeHours:number; acceptedVoluntarily:boolean; }
export function validateShiftPlan(plan:ShiftPlan) {
 const values=[plan.primaryHours,plan.secondaryOrEducationHours,plan.transitOrIntakeHours];
 if(!values.every(Number.isFinite)||values.some(v=>v<0)) return {valid:false,totalHours:NaN,reason:"Hours must be finite and non-negative."};
 const totalHours=values.reduce((sum,value)=>sum+value,0);
 if(!plan.acceptedVoluntarily) return {valid:false,totalHours,reason:"Participation must be voluntary."};
 if(totalHours>WORKFORCE_441.maxShiftHours) return {valid:false,totalHours,reason:"Shift exceeds the universal 9-hour ceiling."};
 return {valid:true,totalHours,reason:null};
}
