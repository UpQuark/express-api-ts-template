/**
 * The Risk API response, representing the total risk in micromorts of the requested actions
 * For example:
 * {
 *   "commuterId": "COM-123",
 *   "risk": 5500
 * }
 */

interface RiskResponse {
  commuterId: string;
  // In micromorts
  risk: number;
}

export default RiskResponse;