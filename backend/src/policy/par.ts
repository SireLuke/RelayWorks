export const PAR_POLICY=Object.freeze({populationMultiplier:1.35,transactionFeeRate:0.0002,marketplaceMarkupCeiling:0.15,demurrageExemptionYears:8});
export function calculateTargetFloat(population:number,resourceAvailability:number):number {
 if(!Number.isFinite(population)||population<0) throw new RangeError("population must be finite and non-negative");
 if(!Number.isFinite(resourceAvailability)||resourceAvailability<0||resourceAvailability>1) throw new RangeError("resourceAvailability must be in [0,1]");
 return population*PAR_POLICY.populationMultiplier*resourceAvailability;
}
export function calculateTransactionFee(amount:number):number {
 if(!Number.isFinite(amount)||amount<0) throw new RangeError("amount must be finite and non-negative");
 return amount*PAR_POLICY.transactionFeeRate;
}
export function maximumMarketplacePrice(verifiedNetCost:number):number {
 if(!Number.isFinite(verifiedNetCost)||verifiedNetCost<0) throw new RangeError("verifiedNetCost must be finite and non-negative");
 return verifiedNetCost*(1+PAR_POLICY.marketplaceMarkupCeiling);
}
export function smoothResourceAvailability(current:number,previousSmoothed:number,alpha:number):number {
 for(const [name,value] of [["current",current],["previousSmoothed",previousSmoothed]] as const) if(!Number.isFinite(value)||value<0||value>1) throw new RangeError(name+" must be in [0,1]");
 if(!Number.isFinite(alpha)||alpha<=0||alpha>1) throw new RangeError("alpha must be in (0,1]");
 return alpha*current+(1-alpha)*previousSmoothed;
}
