import express, { Request, Response, NextFunction } from 'express';
import RiskyActivitiesRequest from '../models/RiskyActivitiesRequest';
import {calculateMicromorts} from "../library/micromortCalculator";

const router = express.Router();

/**
 * Trivial health-check
 */
router.get('', express.json(), (req: Request, res: Response, next: NextFunction) => {
  res.send("health check");
});

/**
 * Evaluate the risk of a commuter's actions. Accepts a RiskyActivitiesRequest formatted as JSON.
 */
router.post('', express.json(), (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestBody: Partial<RiskyActivitiesRequest> = req.body;

    // Manually validate that request has commuter ID and an array of 1 or more actions
    if (!requestBody.commuterId || !Array.isArray(requestBody.actions ) || requestBody.actions.length === 0) {
      res.status(400).send('Missing commuter ID or populated actions array');
      return;
    }

    // Manually validate that the unit is an allowed value and action fields are present
    const validUnits = ['mile', 'floor', 'minute', 'quantity'];

    // Validate that all actions are on the same day
    const actionDay = new Date(requestBody.actions[0].timestamp).getDay();

    for (const action of requestBody.actions) {
      // Validate fields are present and unit is valid
      if (!action.timestamp ||
        !action.action || !validUnits.includes(action.unit)
        || typeof action.quantity !== 'number') {
        res.status(400).send('Actions must have a timestamp, valid units and quantity.');
        return;
      }

      if (new Date(action.timestamp).getDay() !== actionDay) {
        res.status(400).send('Actions must all be on the same day');
        return;
      }
    }

    const micromorts = calculateMicromorts(requestBody.actions);
    res.send({
      commuterId: requestBody.commuterId,
      micromorts: micromorts
    });
  } catch (e) {
    res.status(500).send(`An unexpected error occurred. Because this is an example, we're telling you what it is: ${JSON.stringify(e)}`);
  }


  // If validation passes, continue with your logic here
});

export default router;