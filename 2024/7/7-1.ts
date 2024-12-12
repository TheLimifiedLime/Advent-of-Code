const input = Deno.readTextFileSync(import.meta.dirname + "/input.txt")
  .split("\n")
  .map((line) => {
    const [lineResult, lineValues]: string[] = line.split(": ");
    const data = {
      result: Number(lineResult),
      values: lineValues.split(" ").map((number) => Number(number)),
    };
    return data;
  });

const results = input.map((calibration): number | boolean => {
  // generate possible combinations
  const totalCombinations = [];
  for (let num = 0; num < Math.pow(2, calibration.values.length); num++) {
    const combo = num.toString(2).padStart(calibration.values.length, "0");
    totalCombinations.push(combo);
  }

  const combinationResults = totalCombinations.map((fullCombination) => {
    const combination = fullCombination.split("");
    return calibration.values.reduce((previous, current, index) => {
      // 0 = addition
      // 1 = multiplication
      if (combination[index] === "0") return previous + current;

      if (combination[index] === "1") return previous * current;

      return previous;
    });
  });

  return combinationResults.some((combo) => combo === calibration.result)
    ? calibration.result
    : false;
});

console.log(
  results
    .filter((result) => typeof result === "number")
    .reduce((previous, current) => previous + current)
);
