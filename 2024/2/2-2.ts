// Split input into the two lists
const reports = Deno.readTextFileSync(import.meta.dirname + "/input.txt")
  .split("\n")
  .map((value) => {
    return value.split(" ").map((value) => Number(value));
  });

function checkReport(report: number[]): boolean {
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
}

const result = reports.map((report) => {
  const reportValid = checkReport(report);

  if (!reportValid) {
    // Brute force check if removing a value makes it work

    const bruteReportValidities = report.map((_value, index) => {
      const changedReport = [...report];
      changedReport.splice(index, 1);

      return checkReport(changedReport);
    });

    if (bruteReportValidities.includes(true)) return true;
    else return false;
  } else return true;
});

console.log(result.filter((item) => item !== false).length);
