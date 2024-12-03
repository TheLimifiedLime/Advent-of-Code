// Split input into the two lists
const reports = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((value) => {
    return value.split(" ").map((value) => Number(value));
  });

const result = reports.map((report) => {
  // Check differences are in safe range
  const differences = report.map((item, index) => {
    // Don't go out of bounds
    if (index + 1 >= report.length) return true;

    // Check the difference is either 1, 2, or 3
    const absoluteDifference = Math.abs(report[index + 1] - item);
    if (absoluteDifference < 1 || absoluteDifference > 3) return false;

    return true;
  });
  if (differences.includes(false)) return false;

  // Check consistent increment or decrement
  const mainTrend = report[1] - report[0] > 0 ? "increasing" : "decreasing";
  const trends = report.map((item, index) => {
    // Don't go out of bounds
    if (index + 1 >= report.length) return mainTrend;

    return report[index + 1] - item > 0 ? "increasing" : "decreasing";
  });

  if (trends.includes(mainTrend === "increasing" ? "decreasing" : "increasing"))
    return false;

  return true;
});

console.log(result.filter((item) => item !== false).length);
