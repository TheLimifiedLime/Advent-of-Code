// Split input into the two lists
const items = Deno.readTextFileSync(import.meta.dirname + "/input.txt").split(
  "\n"
);
const listA: number[] = [];
const listB: number[] = [];
items.forEach((string) => {
  const [a, b] = string.split("   ");
  listA.push(Number(a));
  listB.push(Number(b));
});

// Sort
listA.sort((a, b) => a - b);
listB.sort((a, b) => a - b);

// Calculate distance
let result = 0;
for (let i = 0; i < items.length; i++) {
  result += Math.abs(listA[i] - listB[i]);
}

console.log(result);
