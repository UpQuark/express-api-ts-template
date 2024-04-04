function getActionMicromortsPerUnit(action: string, quantity: number): number {
  const micromortsPerUnit: Record<string, number> = {
    'smoking': 0.025,
    'rode a shark': 100000,
    'took an elevator': 0.0001,
    'suction-cup climbed a skyscraper': 100,
    'drank a beer': 0.005,
    'skydived recreationally': 10,
    'skydived as a part of an aerial invasion': 10000,
    'running': 0.001,
    'eating a muffin': 0.0001,
    'eating peanuts': 0.002,
  };

  return (micromortsPerUnit[action] || 0) * quantity;
}

export default getActionMicromortsPerUnit;