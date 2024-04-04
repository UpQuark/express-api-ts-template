/**
 * A request to the Risk API that includes a list of actions and a commuter ID
 * For example:
 * {
 *   "commuterId": "COM-123",
 *   "actions": [
 *     {
 *       "timestamp": "2022-01-01 10:05:11",
 *       "action": "walked on sidewalk",
 *       "unit": "mile",
 *       "quantity": 0.4
 *     },
 *     {
 *       "timestamp": "2022-01-01 10:30:09",
 *       "action": "rode a shark",
 *       "unit": "minute",
 *       "quantity": 3
 *     }
 *   ]
 * }
 */
import Action from "./Action";

export interface RiskyActivitiesRequest {
  commuterId: string;
  actions: Action[];
}

export default RiskyActivitiesRequest;