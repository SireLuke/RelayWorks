/**
 * RelayWorks' optional 4-4-1 planning model.
 *
 * This is a planning aid, not a scheduler or employment mandate. A person may
 * opt out, choose a different arrangement, or leave categories unallocated.
 * The nine-hour ceiling applies to the combined planned categories only when
 * a 4-4-1 plan is explicitly being evaluated.
 */

export interface Workforce441Plan {
  /** Primary work, in hours. */
  primaryHours: number;
  /** Secondary work or education, in hours. */
  secondaryHours: number;
  /** Transit, intake, or logistics, in hours. */
  logisticsHours: number;
  /** Explicit opt-in; false plans are not judged against the model. */
  optedIn: boolean;
}

export interface Workforce441Assessment {
  applicable: boolean;
  valid: boolean;
  totalHours: number;
  errors: string[];
}

const MAX_PRIMARY_HOURS = 4;
const MAX_SECONDARY_HOURS = 4;
const MAX_LOGISTICS_HOURS = 1;
const MAX_TOTAL_HOURS = 9;

export function assessWorkforce441(plan: Workforce441Plan): Workforce441Assessment {
  const values = [plan.primaryHours, plan.secondaryHours, plan.logisticsHours];
  const errors: string[] = [];

  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    errors.push("Hours must be finite, non-negative numbers.");
  }

  const totalHours = values.every((value) => Number.isFinite(value) && value >= 0)
    ? values.reduce((sum, value) => sum + value, 0)
    : 0;

  if (!plan.optedIn) {
    return { applicable: false, valid: errors.length === 0, totalHours, errors };
  }

  if (plan.primaryHours > MAX_PRIMARY_HOURS) {
    errors.push("Primary work exceeds the 4-hour 4-4-1 planning target.");
  }
  if (plan.secondaryHours > MAX_SECONDARY_HOURS) {
    errors.push("Secondary work or education exceeds the 4-hour planning target.");
  }
  if (plan.logisticsHours > MAX_LOGISTICS_HOURS) {
    errors.push("Transit, intake, or logistics exceeds the 1-hour planning allowance.");
  }
  if (totalHours > MAX_TOTAL_HOURS) {
    errors.push("Combined planned time exceeds the 9-hour maximum.");
  }

  return { applicable: true, valid: errors.length === 0, totalHours, errors };
}
