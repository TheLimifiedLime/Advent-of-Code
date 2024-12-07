const input = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const operations = [
  ...input.matchAll(/(do\(\))|don't\(\)|(mul\((?<num1>\d+),(?<num2>\d+)\))/g),
];

let operationsState = true;
const results: number[] = operations.map((op) => {
  if (op[0] === "do()" || op[0] === "don't()") {
    operationsState = op[0] === "do()" ? true : false;
    return 0;
  }

  if (operationsState) {
    if (!op.groups) return 0;

    const num1 = Number(op.groups.num1);
    const num2 = Number(op.groups.num2);

    return num1 * num2;
  } else return 0;
});

console.log(results.reduce((accumulator, value) => accumulator + value));
