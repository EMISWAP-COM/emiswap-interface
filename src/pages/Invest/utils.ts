export const getClosestNumber = (counts: number[], goal: number) => {
  return counts.reduce(function(prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
};

export const getNextNumber = (counts: number[], goal: number) => {
  return (
    counts.find(num => {
      return num >= goal;
    }) || 0
  );
};
