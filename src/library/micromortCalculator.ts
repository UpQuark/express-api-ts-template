import Action from "../models/Action";
import getActionMicromortsPerUnit from "./micromortActionReader";

/**
 * Add up all the micromorts from the submitted actions.
 * I could imagine an IRL world where this does more computation logic than just looping and summing.
 * @param actions
 */
export function calculateMicromorts(actions: Action[]) {
  let totalMicromorts = 0;

  for (const action of actions) {
    totalMicromorts += getActionMicromortsPerUnit(action.action, action.quantity);
  }

  return totalMicromorts;
}