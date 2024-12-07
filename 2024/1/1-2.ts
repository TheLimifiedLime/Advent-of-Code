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

// Count occurrences in list B
const countB: Map<number, number> = new Map();
listB.forEach((value) => {
  const current = countB.get(value);
  current ? countB.set(value, current + 1) : countB.set(value, 1);
});

// Calculate similarity score
let similarityScore = 0;
listA.forEach((value) => {
  const reoccurrenceListB = countB.get(value);
  similarityScore += reoccurrenceListB ? value * reoccurrenceListB : value * 0;
});

console.log(similarityScore);
