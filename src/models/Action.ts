/**
 * A single action, metadata, and the quantity it occurred in. E.g. Smoking 40 cigars.
 * For example:
 * {
 *   "timestamp": "2022-01-01 10:30:09",
 *   "action": "rode a shark",
 *   "unit": "minute",
 *   "quantity": 3
 * }
 */
export interface Action {
  timestamp: string;
  action: string;
  unit: "mile" | "floor" | "minute" | "quantity";
  quantity: number;
}

export default Action;