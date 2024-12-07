const input = Deno.readTextFileSync(import.meta.dirname + "/input.txt");

const operations = [...input.matchAll(/mul\((?<num1>\d+),(?<num2>\d+)\)/g)];

const results: number[] = operations.map((op) => {
  if (!op.groups) return 0;
  const num1 = Number(op.groups.num1);
  const num2 = Number(op.groups.num2);

  return num1 * num2;
});

console.log(results.reduce((accumulator, value) => accumulator + value));
